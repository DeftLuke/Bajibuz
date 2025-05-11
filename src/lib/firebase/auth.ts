import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile,
  PhoneAuthProvider,
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import type { UserProfile } from '@/context/auth-context';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', (error as Error).message);
    throw error; // Re-throw to be handled by UI
  }
};

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email and password:', (error as Error).message);
    throw error; // Re-throw to be handled by UI
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<FirebaseUser | null> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email and password:', (error as Error).message);
    throw error; // Re-throw to be handled by UI
  }
};


export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const determineSignupMethod = (
  userAuth: FirebaseUser
): 'email' | 'google' | 'phone' => {
  if (
    userAuth.providerData.some(
      (p) => p.providerId === GoogleAuthProvider.PROVIDER_ID
    )
  ) {
    return 'google';
  }
  if (
    userAuth.providerData.some(
      (p) => p.providerId === PhoneAuthProvider.PROVIDER_ID
    )
  ) {
    return 'phone';
  }
  return 'email';
};

export const createUserDocumentFromAuth = async (
  userAuth: FirebaseUser,
  additionalInformation: Partial<
    UserProfile & { signupMethod?: 'email' | 'google' | 'phone' }
  > = {}
): Promise<UserProfile | null> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL, uid, phoneNumber } = userAuth;
    const firestoreCreatedAt = serverTimestamp(); // Use serverTimestamp for new docs
    const referralCode = generateReferralCode();

    const newUserProfileData = {
      uid, // ensure uid is part of the data being set
      name: additionalInformation.name || displayName || 'Bajibuz User',
      email: additionalInformation.email || email || '',
      avatar:
        additionalInformation.avatar || photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod:
        additionalInformation.signupMethod || determineSignupMethod(userAuth),
      languagePreference: additionalInformation.languagePreference || 'en',
      walletBalance: additionalInformation.walletBalance || 0,
      kycStatus: additionalInformation.kycStatus || 'not_submitted',
      referralCode,
      loginIPs: additionalInformation.loginIPs || [],
      phoneNumber: additionalInformation.phoneNumber || phoneNumber || '',
      createdAt: firestoreCreatedAt, // This will be a server timestamp placeholder
      isNewUser: true,
    };

    try {
      await setDoc(userDocRef, newUserProfileData);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('showWelcomeSpin', 'true');
      }
      
      // Re-fetch to get the resolved server timestamp
      const freshSnapshot = await getDoc(userDocRef);
      if (freshSnapshot.exists()) {
        const data = freshSnapshot.data();
        const finalCreatedAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(); // Fallback, should be a Timestamp

        return {
          ...(data as Omit<UserProfile, 'createdAt' | 'uid'>), // Cast to ensure type safety, excluding fields handled
          uid,
          createdAt: finalCreatedAt,
        } as UserProfile; // isNewUser is already in data
      }
      console.error('Failed to re-fetch user document after creation for UID:', uid);
      return null;

    } catch (error) {
      console.error('Error creating user document for UID:', uid, (error as Error).message);
      return null;
    }
  } else {
    // User exists, update last login or other relevant info if needed
    // For now, just return existing profile
    const existingProfile = userSnapshot.data() as Omit<UserProfile, 'isNewUser' | 'createdAt'> & { createdAt: Timestamp | Date };
    const createdAtDate =
      existingProfile.createdAt instanceof Timestamp
        ? existingProfile.createdAt.toDate()
        : existingProfile.createdAt instanceof Date
        ? existingProfile.createdAt
        : new Date(); // Fallback if type is unexpected

    // Optionally update last login time or IP here if needed using updateDoc
    // await updateDoc(userDocRef, { lastLoginAt: serverTimestamp(), /* add IP if available */ });
    
    return {
      ...existingProfile,
      uid: userAuth.uid,
      createdAt: createdAtDate,
      isNewUser: false, // Existing user
    } as UserProfile;
  }
};

export const onAuthStateChangedListener = (
  callback: (user: FirebaseUser | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('showWelcomeSpin'); // Clear this on logout
    }
  } catch (error) {
    console.error('Error signing out:', (error as Error).message);
  }
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  if (!uid) return null;

  const userDocRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const data = userSnapshot.data();
    // Ensure createdAt is converted to Date
    const createdAt =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt instanceof Date
        ? data.createdAt
        : new Date(); // Fallback

    return { ...(data as Omit<UserProfile, 'createdAt' | 'uid'>), uid, createdAt } as UserProfile;
  }
  return null;
};
