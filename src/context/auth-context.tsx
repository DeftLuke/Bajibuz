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
  referralCode?: string;
  loginIPs?: string[];
  isNewUser?: boolean; // Indicates if the user profile was just created in Firestore
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
  const [loading, setLoading] = useState(true); // Start with loading true

  const updateCurrentUserProfile = async (updates: Partial<UserProfile>) => {
    if (currentUser) {
      try {
        // Ensure walletBalance is not negative if it's being updated
        if (updates.walletBalance !== undefined && updates.walletBalance < 0) {
          updates.walletBalance = 0;
        }
        await updateUserDocument(currentUser.uid, updates);
        setCurrentUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
      } catch (error) {
        console.error("AuthContext: Error updating user profile in context:", error);
      }
    }
  };


  useEffect(() => {
    console.log('AuthContext: Subscribing to auth state changes.');
    // setLoading(true); // Already true by default, no need to set again here
    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
      console.log('AuthContext: onAuthStateChangedListener fired. Firebase User:', user ? user.uid : 'null');
      if (user) {
        try {
          console.log('AuthContext: Firebase user detected. Fetching/creating Firestore profile...');
          let userProfileDoc = await getUserProfile(user.uid);
          console.log('AuthContext: getUserProfile result:', userProfileDoc ? `UID: ${userProfileDoc.uid}, Name: ${userProfileDoc.name}` : 'null');

          if (!userProfileDoc) {
            console.log('AuthContext: No Firestore profile found, creating new one...');
            // This path means a user is authenticated with Firebase, but no corresponding Firestore document exists.
            // This is typical for a first-time signup where the Firebase user is created, then this listener fires.
            userProfileDoc = await createUserDocumentFromAuth(user, {
              name: user.displayName || undefined,
              email: user.email || undefined,
              signupMethod: user.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'email',
              avatar: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
              // createUserDocumentFromAuth will set isNewUser: true and handle bonus popup flag
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
            // This case should ideally not happen if createUserDocumentFromAuth is robust.
            // If it does, it means profile creation/fetching failed.
            console.warn('AuthContext: userProfileDoc is null after fetch/create attempt. Setting currentUser to null.');
            setCurrentUser(null); 
          }
        } catch (error) {
          console.error("AuthContext: Error processing auth state change (user present path):", error);
          setCurrentUser(null);
        } finally {
          console.log('AuthContext: Setting loading to false (user path completed).');
          setLoading(false);
        }
      } else {
        console.log('AuthContext: No Firebase user, setting currentUser to null.');
        setCurrentUser(null);
        console.log('AuthContext: Setting loading to false (no user path).');
        setLoading(false);
      }
    });

    return () => {
        console.log('AuthContext: Unsubscribing from auth state changes.');
        unsubscribe();
    }
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  const value: AuthContextType = {
    currentUser,
    setCurrentUser, // This setter is rarely used directly by components, AuthProvider manages it.
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
