
import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, getDoc, setDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import type { UserProfile } from '@/context/auth-context';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
};

export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const createUserDocumentFromAuth = async (
  userAuth: FirebaseUser,
  additionalInformation: Partial<UserProfile> = {}
): Promise<void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL, uid } = userAuth;
    const createdAt = serverTimestamp(); // Use Firestore server timestamp
    const referralCode = generateReferralCode();

    const newUserProfile: UserProfile = {
      uid,
      name: displayName || 'Anonymous User',
      email: email || '',
      avatar: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod: 'google',
      createdAt: new Date(), // Placeholder, will be overwritten by serverTimestamp
      languagePreference: 'en',
      walletBalance: 0,
      kycStatus: 'pending',
      referralCode,
      loginIPs: [], // Initialize as empty array
      ...additionalInformation,
    };

    try {
      await setDoc(userDocRef, { ...newUserProfile, createdAt }); // Server timestamp for creation
      console.log('User document created for:', uid);
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  } else {
    // User exists, potentially update last login IP or other relevant info
    try {
        // Example: Add current IP to loginIPs array (IP detection logic not included here)
        // await updateDoc(userDocRef, {
        //   loginIPs: arrayUnion(detectedIpAddress),
        //   lastLogin: serverTimestamp()
        // });
    } catch (error) {
        console.error('Error updating user document on login:', error);
    }
  }
};

export const onAuthStateChangedListener = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  const userDocRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) {
    const data = userSnapshot.data();
    // Convert Firestore Timestamp to Date for client-side usage
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    return { ...data, createdAt } as UserProfile;
  }
  return null;
};
