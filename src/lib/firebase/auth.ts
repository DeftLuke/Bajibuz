import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile, // Renamed to avoid conflict
  PhoneAuthProvider,
  updatePassword as firebaseUpdatePassword, // Import updatePassword
  EmailAuthProvider,
  reauthenticateWithCredential,
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
    throw error; 
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
      // Update Firebase Auth profile
      await firebaseUpdateProfile(userCredential.user, { displayName });
      // Firestore document will be created/updated by createUserDocumentFromAuth
    }
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email and password:', (error as Error).message);
    throw error; 
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<FirebaseUser | null> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email and password:', (error as Error).message);
    throw error; 
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
  additionalInformation: Partial<UserProfile> = {}
): Promise<UserProfile | null> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL, uid, phoneNumber } = userAuth;
    const firestoreCreatedAt = serverTimestamp(); 
    const referralCode = generateReferralCode();

    const newUserProfileData: Omit<UserProfile, 'createdAt' | 'uid'> & { createdAt: any } = {
      name: additionalInformation.name || displayName || 'Bajibuz User',
      email: additionalInformation.email || email || '',
      avatar:
        additionalInformation.avatar || photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod:
        additionalInformation.signupMethod || determineSignupMethod(userAuth),
      languagePreference: additionalInformation.languagePreference || 'en',
      walletBalance: additionalInformation.walletBalance || 0, // Initialize wallet balance
      kycStatus: additionalInformation.kycStatus || 'not_submitted',
      referralCode,
      loginIPs: additionalInformation.loginIPs || [],
      phoneNumber: additionalInformation.phoneNumber || phoneNumber || '',
      createdAt: firestoreCreatedAt, 
      isNewUser: true,
    };

    try {
      await setDoc(userDocRef, { uid, ...newUserProfileData }); // Add uid here explicitly
      
      // This flag will be used by LoginBonusPopupWrapper
      if (typeof window !== 'undefined') {
        localStorage.setItem('showLoginBonusPopup', 'true');
      }
            
      const freshSnapshot = await getDoc(userDocRef);
      if (freshSnapshot.exists()) {
        const data = freshSnapshot.data();
        const finalCreatedAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(); 

        return {
          ...(data as Omit<UserProfile, 'createdAt'>),
          createdAt: finalCreatedAt,
        } as UserProfile;
      }
      console.error('Failed to re-fetch user document after creation for UID:', uid);
      return null;

    } catch (error) {
      console.error('Error creating user document for UID:', uid, (error as Error).message);
      return null;
    }
  } else {
    const existingProfileData = userSnapshot.data();
    const createdAtDate =
      existingProfileData.createdAt instanceof Timestamp
        ? existingProfileData.createdAt.toDate()
        : existingProfileData.createdAt instanceof Date
        ? existingProfileData.createdAt
        : new Date();
    
    // For existing users logging in, also show bonus popup via flag
    if (typeof window !== 'undefined') {
        localStorage.setItem('showLoginBonusPopup', 'true');
    }

    return {
      ...existingProfileData,
      uid: userAuth.uid,
      createdAt: createdAtDate,
      isNewUser: false,
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
      localStorage.removeItem('showLoginBonusPopup');
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
    const createdAt =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt instanceof Date
        ? data.createdAt
        : new Date(); 

    return { ...(data as Omit<UserProfile, 'createdAt' | 'uid'>), uid, createdAt } as UserProfile;
  }
  return null;
};

export const updateUserDocument = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  if (!uid) throw new Error("User ID is required to update document.");
  const userDocRef = doc(db, 'users', uid);
  try {
    await updateDoc(userDocRef, data);
  } catch (error) {
    console.error('Error updating user document:', (error as Error).message);
    throw error;
  }
};

// Function to update user's password
export const updateUserPassword = async (newPassword: string, currentPassword?: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in.");

  // Re-authentication is needed for password change for security reasons
  // This example assumes you'll handle currentPassword input if the user signed up with email/password
  if (user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) && currentPassword) {
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error("Re-authentication failed:", error);
      throw new Error("Re-authentication failed. Please check your current password.");
    }
  }
  // If user signed in with Google, or re-auth is successful (or not needed e.g. recent login)
  try {
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating password:', (error as Error).message);
    throw error;
  }
};
