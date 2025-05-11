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
        await updateUserDocument(currentUser.uid, updates);
        setCurrentUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
      } catch (error) {
        console.error("Error updating user profile in context:", error);
        // Optionally re-throw or handle with a toast
      }
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
      if (user) {
        try {
          let userProfileDoc = await getUserProfile(user.uid);

          if (!userProfileDoc) {
            userProfileDoc = await createUserDocumentFromAuth(user, {
              name: user.displayName || undefined,
              email: user.email || undefined,
              signupMethod: user.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'email',
              avatar: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
            });
          }
          
          if (userProfileDoc) {
            const createdAtDate =
              userProfileDoc.createdAt instanceof Date
                ? userProfileDoc.createdAt
                : (userProfileDoc.createdAt as unknown as Timestamp)?.toDate?.() || new Date();
            
            setCurrentUser({
              ...userProfileDoc,
              createdAt: createdAtDate,
            });
          } else {
            setCurrentUser(null); 
            console.error("Failed to get or create user profile for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error processing auth state change:", error);
          setCurrentUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
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

