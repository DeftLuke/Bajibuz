
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChangedListener, getUserProfile, createUserDocumentFromAuth } from '@/lib/firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  phoneNumber?: string;
  signupMethod: 'email' | 'google' | 'phone';
  createdAt: Date; // Always ensure this is a Date object in the context
  languagePreference: 'en' | 'bn';
  walletBalance: number;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  referralCode?: string;
  loginIPs?: string[];
  isNewUser?: boolean;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void; // Though typically not directly used by components
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
      if (user) {
        let userProfile = await getUserProfile(user.uid);

        if (!userProfile) {
          // User exists in Firebase Auth but not in Firestore, create document
          userProfile = await createUserDocumentFromAuth(user, {
             // Pass any necessary defaults or info from user object if signup didn't go through UI
            name: user.displayName || undefined,
            email: user.email || undefined,
            signupMethod: user.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'email',
            // languagePreference: 'en', // Default, or detect from browser
          });
        }
        
        if (userProfile) {
          // Ensure createdAt is a Date object
          const createdAtDate =
            userProfile.createdAt instanceof Date
              ? userProfile.createdAt
              : (userProfile.createdAt as unknown as Timestamp)?.toDate?.() || new Date();
          
          setCurrentUser({
            ...userProfile,
            createdAt: createdAtDate,
          });
        } else {
          // Handle case where profile creation/fetching failed critically
          setCurrentUser(null); 
          console.error("Failed to get or create user profile for UID:", user.uid);
        }

      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value: AuthContextType = {
    currentUser,
    setCurrentUser, // Expose for potential advanced use cases, though typically managed internally
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
