
import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  PhoneAuthProvider, // For determining phone signup method
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore'; // Added Timestamp for type checking
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
    throw error; 
  }
};

export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Helper to determine signup method from FirebaseUser
const determineSignupMethod = (userAuth: FirebaseUser): 'email' | 'google' | 'phone' => {
  if (userAuth.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID)) {
    return 'google';
  }
  if (userAuth.providerData.some(p => p.providerId === PhoneAuthProvider.PROVIDER_ID)) {
    return 'phone';
  }
  return 'email'; // Default or if email/password was used directly
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
    const firestoreCreatedAt = serverTimestamp(); 
    const referralCode = generateReferralCode();

    // Client-side representation of newUserProfile before sending to Firestore
    // Note: `createdAt` here is a client-side new Date(), but `firestoreCreatedAt` (serverTimestamp) is sent to Firestore.
    const newUserProfileData: Omit<UserProfile, 'createdAt' | 'uid'> & { createdAt?: Date } = {
      name: additionalInformation.name || displayName || 'Anonymous User',
      email: additionalInformation.email || email || '',
      avatar: photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod: additionalInformation.signupMethod || determineSignupMethod(userAuth),
      languagePreference: additionalInformation.languagePreference || 'en',
      walletBalance: additionalInformation.walletBalance || 0,
      kycStatus: additionalInformation.kycStatus || 'not_submitted',
      referralCode,
      loginIPs: additionalInformation.loginIPs || [],
      phoneNumber: additionalInformation.phoneNumber || phoneNumber || '',
      isNewUser: true,
    };

    try {
      // Use serverTimestamp for createdAt when writing to Firestore
      await setDoc(userDocRef, { ...newUserProfileData, uid, createdAt: firestoreCreatedAt });
      console.log('User document created for:', uid);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('showWelcomeSpin', 'true');
      }

      // Re-fetch to get serverTimestamp resolved
      const freshSnapshot = await getDoc(userDocRef);
      if (freshSnapshot.exists()) {
        const data = freshSnapshot.data();
        // Ensure createdAt is a Date object
        const finalCreatedAt = data.createdAt && typeof data.createdAt.toDate === 'function' 
          ? data.createdAt.toDate() 
          : new Date(); // Fallback if toDate is not available or createdAt is missing
        return { ...data, uid, createdAt: finalCreatedAt, isNewUser: true } as UserProfile;
      }
      console.error('Failed to re-fetch user document after creation for UID:', uid);
      return null;

    } catch (error) {
      console.error('Error creating user document for UID:', uid, error);
      return null;
    }
  } else {
     const existingProfile = userSnapshot.data() as UserProfile;
     // Ensure createdAt is a Date object
     const createdAtDate = existingProfile.createdAt instanceof Timestamp 
        ? existingProfile.createdAt.toDate() 
        : (existingProfile.createdAt instanceof Date ? existingProfile.createdAt : new Date());

    return { ...existingProfile, uid: userAuth.uid, createdAt: createdAtDate, isNewUser: false };
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
    const createdAt = data.createdAt instanceof Timestamp 
      ? data.createdAt.toDate() 
      : (data.createdAt instanceof Date ? data.createdAt : new Date());
    return { ...data, uid, createdAt } as UserProfile;
  }
  return null;
};

