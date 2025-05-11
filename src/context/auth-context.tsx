
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
  phoneNumber?: string; // Added phoneNumber
  signupMethod: 'email' | 'google' | 'phone';
  createdAt: Date | Timestamp; 
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
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
      if (user) {
        // Try to get existing profile first
        let userProfile = await getUserProfile(user.uid);
        
        if (!userProfile) {
          // If no profile, means it's a new user (or data was lost).
          // createUserDocumentFromAuth will create it and set isNewUser: true internally.
          userProfile = await createUserDocumentFromAuth(user, {
            name: user.displayName || undefined, // Pass these if available from FirebaseUser
            email: user.email || undefined,
            phoneNumber: user.phoneNumber || undefined,
            signupMethod: user.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'email'
          });
        } else {
          // User profile exists, not a new user in terms of document creation.
          // Convert Firestore Timestamp to Date if necessary
           const createdAtDate = userProfile.createdAt instanceof Date ? userProfile.createdAt : (userProfile.createdAt as any)?.toDate() || new Date();
          userProfile = { ...userProfile, createdAt: createdAtDate, isNewUser: false };
        }
        setCurrentUser(userProfile);

      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  if (loading && typeof window !== 'undefined' && !currentUser) {
    // Optional: A global loading indicator
    // For now, returning children directly if loading is false or if it's server-side.
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
