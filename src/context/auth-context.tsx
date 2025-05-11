
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChangedListener, getUserProfile, createUserDocumentFromAuth } from '@/lib/firebase/auth';
import type { Timestamp } from 'firebase/firestore';


export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  signupMethod: 'email' | 'google' | 'phone';
  createdAt: Date | Timestamp; // Can be Date on client, Timestamp from Firestore
  languagePreference: 'en' | 'bn';
  walletBalance: number;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  referralCode?: string;
  loginIPs?: string[];
  isNewUser?: boolean; // Flag to indicate first-time sign-up
}

interface AuthContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
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
          // This scenario handles if a user authenticates with Firebase
          // but their Firestore document wasn't created (e.g. due to an error or race condition).
          // Or, this is their very first sign-in via Google, and we need to create the doc.
          await createUserDocumentFromAuth(user); // Create if doesn't exist from Google sign in
          userProfile = await getUserProfile(user.uid); // Fetch again
          if (userProfile) {
             userProfile.isNewUser = true; // Mark as new user for potential welcome actions
             // Store flag for DailySpinPopupWrapper
             if (typeof window !== 'undefined') {
                localStorage.setItem('showWelcomeSpin', 'true');
             }
          }
        }
        setCurrentUser(userProfile);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading && typeof window !== 'undefined' && !currentUser) {
    // Optional: Display a global loading indicator or skeleton for the initial auth check
    // For simplicity, returning null or a minimal loader here.
    // return <div>Loading authentication state...</div>; 
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
