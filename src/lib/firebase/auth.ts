
import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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

export const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string): Promise<FirebaseUser | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update Firebase Auth profile with displayName
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email and password:', error);
    // Type assertion for FirebaseError if needed, or handle specific error codes
    // For example, if (error.code === 'auth/email-already-in-use') { ... }
    throw error; // Re-throw to be caught by the caller
  }
};

export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const createUserDocumentFromAuth = async (
  userAuth: FirebaseUser,
  additionalInformation: Partial<UserProfile & { signupMethod?: 'email' | 'google' | 'phone' }> = {}
): Promise<UserProfile | null> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL, uid, phoneNumber } = userAuth;
    const createdAt = serverTimestamp(); 
    const referralCode = generateReferralCode();

    const newUserProfile: UserProfile = {
      uid,
      name: displayName || additionalInformation.name || 'Anonymous User',
      email: email || additionalInformation.email || '',
      avatar: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod: additionalInformation.signupMethod || (userAuth.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID) ? 'google' : 'email'),
      createdAt: new Date(), // Placeholder for client, serverTimestamp used in setDoc
      languagePreference: additionalInformation.languagePreference || 'en',
      walletBalance: 0,
      kycStatus: 'not_submitted', // Default to not_submitted
      referralCode,
      loginIPs: [],
      phoneNumber: phoneNumber || additionalInformation.phoneNumber || '',
      isNewUser: true, // Mark as new user for the first time
      ...additionalInformation, // Spread other additional info like username if passed
    };

    try {
      await setDoc(userDocRef, { ...newUserProfile, createdAt });
      console.log('User document created for:', uid);
       // Also set the flag for the daily spin popup
      if (typeof window !== 'undefined') {
        localStorage.setItem('showWelcomeSpin', 'true');
      }
      // Re-fetch to get serverTimestamp resolved
      const freshSnapshot = await getDoc(userDocRef);
      if (freshSnapshot.exists()) {
        const data = freshSnapshot.data();
        const finalCreatedAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        return { ...data, createdAt: finalCreatedAt, isNewUser: true } as UserProfile;
      }
      return null;

    } catch (error) {
      console.error('Error creating user document:', error);
      return null;
    }
  } else {
    // User exists, potentially update last login IP or other relevant info
     const existingProfile = userSnapshot.data() as UserProfile;
     const createdAtDate = existingProfile.createdAt instanceof Date ? existingProfile.createdAt : (existingProfile.createdAt as any)?.toDate() || new Date();

    return { ...existingProfile, createdAt: createdAtDate, isNewUser: false }; // Not a new user if document exists
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
