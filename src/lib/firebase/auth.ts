
import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile as firebaseUpdateUserProfile,
  PhoneAuthProvider,
  updatePassword as firebaseUpdatePassword, 
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
    // Note: Setting localStorage 'showLoginBonusPopup' is now primarily handled by
    // createUserDocumentFromAuth or the calling component (login/signup page)
    // to ensure it's set at the right point in the flow.
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
      await firebaseUpdateUserProfile(userCredential.user, { displayName });
      // Firestore document will be created/updated by createUserDocumentFromAuth
      // which will also handle setting the 'showLoginBonusPopup' flag.
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
    // Note: Setting localStorage 'showLoginBonusPopup' is handled by the calling page
    // after successful login and before redirection.
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
      walletBalance: additionalInformation.walletBalance || 0,
      kycStatus: additionalInformation.kycStatus || 'not_submitted',
      referralCode,
      loginIPs: additionalInformation.loginIPs || [],
      phoneNumber: additionalInformation.phoneNumber || phoneNumber || '',
      createdAt: firestoreCreatedAt, 
      isNewUser: true, // Explicitly set for new users
    };

    try {
      await setDoc(userDocRef, { uid, ...newUserProfileData });
      
      // If this is a new user creation (implies first-time login/signup)
      // set the flag for the login bonus popup.
      // This ensures the popup shows after redirecting to dashboard.
      if (typeof window !== 'undefined' && additionalInformation.isNewUser) {
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
    // Existing user, update information if necessary or just return profile.
    // If additionalInformation.isNewUser is somehow true for an existing user, it implies
    // a login for an existing user where we still want to show the bonus (if that's the logic).
    // Typically, for login, showLoginBonusPopup is set on the login page.
    const existingProfileData = userSnapshot.data();
    const createdAtDate =
      existingProfileData.createdAt instanceof Timestamp
        ? existingProfileData.createdAt.toDate()
        : existingProfileData.createdAt instanceof Date
        ? existingProfileData.createdAt
        : new Date();
    
    // If it's an existing user logging in, the login page itself should set the flag.
    // However, if `isNewUser` somehow passed for an existing user profile fetch via this function,
    // this ensures the flag is set.
    if (typeof window !== 'undefined' && additionalInformation.isNewUser) {
        localStorage.setItem('showLoginBonusPopup', 'true');
    }


    return {
      ...existingProfileData,
      uid: userAuth.uid,
      createdAt: createdAtDate,
      // isNewUser should reflect the actual status. If it's an existing user, it's not new.
      // The passed `additionalInformation.isNewUser` could be used to force the bonus logic if needed.
      isNewUser: additionalInformation.isNewUser !== undefined ? additionalInformation.isNewUser : false, 
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
      // Clear the flag when user signs out, so it doesn't persist for next login
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
    // Ensure walletBalance is not negative
    if (data.walletBalance !== undefined && data.walletBalance < 0) {
      data.walletBalance = 0;
    }
    await updateDoc(userDocRef, data);
  } catch (error) {
    console.error('Error updating user document:', (error as Error).message);
    throw error;
  }
};

export const updateUserPassword = async (newPassword: string, currentPassword?: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in.");

  if (user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) && currentPassword) {
    if (!user.email) throw new Error("User email is not available for re-authentication.");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error("Re-authentication failed:", error);
      throw new Error("Re-authentication failed. Please check your current password.");
    }
  }
  try {
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating password:', (error as Error).message);
    throw error;
  }
};
