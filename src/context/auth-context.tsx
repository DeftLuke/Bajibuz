'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChangedListener, getUserProfile, createUserDocumentFromAuth, updateUserDocument } from '@/lib/firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  phoneNumber?: string;
  signupMethod: 'email' | 'google' | 'phone';
  createdAt: Date;
  languagePreference: 'en' | 'bn';
  walletBalance: number;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  vipTier?: string;
  referralCode?: string;
  loginIPs?: string[];
  isNewUser?: boolean; 
}

interface AuthContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const updateCurrentUserProfile = async (updates: Partial<UserProfile>) => {
    if (currentUser) {
      try {
        if (updates.walletBalance !== undefined && updates.walletBalance < 0) {
          updates.walletBalance = 0;
        }
        await updateUserDocument(currentUser.uid, updates);
        setCurrentUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
      } catch (error) {
        console.error("AuthContext: Error updating user profile in context:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    console.log('AuthContext: Subscribing to auth state changes.');
    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
      console.log('AuthContext: onAuthStateChangedListener fired. Firebase User:', user ? user.uid : 'null');
      try { 
        if (user) {
          try {
            console.log('AuthContext: Firebase user detected. Fetching/creating Firestore profile...');
            let userProfileDoc = await getUserProfile(user.uid);
            console.log('AuthContext: getUserProfile result:', userProfileDoc ? `UID: ${userProfileDoc.uid}, Name: ${userProfileDoc.name}` : 'null');

            if (!userProfileDoc) {
              console.log('AuthContext: No Firestore profile found, creating new one...');
              userProfileDoc = await createUserDocumentFromAuth(user, {
                name: user.displayName || undefined,
                email: user.email || undefined,
                signupMethod: user.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'email',
                avatar: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
              });
              console.log('AuthContext: createUserDocumentFromAuth result:', userProfileDoc ? `UID: ${userProfileDoc.uid}, Name: ${userProfileDoc.name}, IsNew: ${userProfileDoc.isNewUser}` : 'null');
            }
            
            if (userProfileDoc) {
              const createdAtDate =
                userProfileDoc.createdAt instanceof Date
                  ? userProfileDoc.createdAt
                  : (userProfileDoc.createdAt as unknown as Timestamp)?.toDate?.() || new Date();
              
              const finalProfile = {
                ...userProfileDoc,
                createdAt: createdAtDate,
              };
              console.log(`AuthContext: Setting currentUser in context: UID: ${finalProfile.uid}, Name: ${finalProfile.name}, IsNew: ${finalProfile.isNewUser}`);
              setCurrentUser(finalProfile);
            } else {
              console.warn('AuthContext: userProfileDoc is null after fetch/create attempt. Setting currentUser to null.');
              setCurrentUser(null); 
            }
          } catch (profileError) { 
            console.error("AuthContext: Error in profile fetching/creation:", profileError);
            setCurrentUser(null);
          }
        } else { 
          console.log('AuthContext: No Firebase user, setting currentUser to null.');
          setCurrentUser(null);
        }
      } catch (outerError) { 
        console.error("AuthContext: Outer error in onAuthStateChangedListener:", outerError);
        setCurrentUser(null);
      } finally { 
        console.log('AuthContext: Auth state processing complete. Setting loading to false.');
        setLoading(false);
      }
    });

    return () => {
        console.log('AuthContext: Unsubscribing from auth state changes.');
        unsubscribe();
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
    updateCurrentUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
