import type { User as FirebaseUser } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  PhoneAuthProvider, // Keep for future phone auth
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
    // Bonus popup flag is set by login page or AuthContext after profile check
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
      // Update Firebase Auth profile (separate from Firestore document)
      await firebaseUpdateProfile(userCredential.user, { displayName });
    }
    // Firestore document creation (and bonus flag for new user) is handled by AuthContext's
    // onAuthStateChanged listener calling createUserDocumentFromAuth.
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email and password:', (error as Error).message);
    throw error; 
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<FirebaseUser | null> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    // Bonus popup flag is set by login page after this function returns successfully.
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
  if (userAuth.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID)) {
    return 'google';
  }
  if (userAuth.providerData.some(p => p.providerId === PhoneAuthProvider.PROVIDER_ID)) {
    return 'phone';
  }
  return 'email';
};

// This function is primarily called by AuthContext when onAuthStateChanged detects a Firebase user.
// `additionalInformation` is used to provide defaults if creating a new Firestore document.
export const createUserDocumentFromAuth = async (
  userAuth: FirebaseUser,
  additionalInformation: Partial<Pick<UserProfile, 'name' | 'email' | 'avatar' | 'languagePreference' | 'signupMethod'| 'vipTier'>> = {}
): Promise<UserProfile | null> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) { // This indicates a truly new user to our Firestore system
    console.log(`createUserDocumentFromAuth: No Firestore doc for ${userAuth.uid}. Creating new one.`);
    const { displayName, email, photoURL, uid, phoneNumber } = userAuth;
    const firestoreCreatedAt = serverTimestamp(); 
    const referralCode = generateReferralCode();

    // Default values for a brand new user profile in Firestore
    const newUserProfileData: Omit<UserProfile, 'createdAt' | 'uid'> & { createdAt: any } = {
      name: additionalInformation.name || displayName || 'Bajibuz User',
      email: additionalInformation.email || email || '',
      avatar: additionalInformation.avatar || photoURL || `https://picsum.photos/seed/${uid}/100/100`,
      signupMethod: additionalInformation.signupMethod || determineSignupMethod(userAuth),
      languagePreference: additionalInformation.languagePreference || 'en',
      walletBalance: 0, // New users start with 0 balance before any bonus
      kycStatus: 'not_submitted',
      vipTier: additionalInformation.vipTier || 'Bronze', // Default to Bronze
      referralCode,
      loginIPs: [],
      phoneNumber: phoneNumber || '', // Use Firebase Auth phone if available
      createdAt: firestoreCreatedAt, 
      isNewUser: true, // Crucially mark as a new user IN FIRESTORE
    };

    try {
      await setDoc(userDocRef, { uid, ...newUserProfileData });
      console.log(`createUserDocumentFromAuth: Successfully created Firestore doc for ${uid}.`);
      
      // Set flag for login bonus popup specifically because a new user doc was created.
      if (typeof window !== 'undefined') {
        localStorage.setItem('showLoginBonusPopup', 'true');
        console.log(`createUserDocumentFromAuth: Set 'showLoginBonusPopup' for new user ${uid}.`);
      }
            
      // Fetch the just-created document to return consistent data structure with timestamps resolved
      const freshSnapshot = await getDoc(userDocRef);
      if (freshSnapshot.exists()) {
        const data = freshSnapshot.data();
        const finalCreatedAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(); 
        return {
          ...(data as Omit<UserProfile, 'createdAt'>),
          createdAt: finalCreatedAt,
        } as UserProfile;
      }
      console.error('createUserDocumentFromAuth: Failed to re-fetch user document after creation for UID:', uid);
      return null;

    } catch (error) {
      console.error('createUserDocumentFromAuth: Error creating user document for UID:', uid, (error as Error).message);
      return null;
    }
  } else { // User document already exists in Firestore
    console.log(`createUserDocumentFromAuth: Firestore doc already exists for ${userAuth.uid}.`);
    const existingProfileData = userSnapshot.data();
    const createdAtDate =
      existingProfileData.createdAt instanceof Timestamp
        ? existingProfileData.createdAt.toDate()
        : existingProfileData.createdAt instanceof Date
        ? existingProfileData.createdAt
        : new Date();
    
    // For an existing user, the login page (LoginPage.tsx) is responsible for setting the 'showLoginBonusPopup' flag.
    // This function, when fetching an existing profile, should reflect its actual state.
    return {
      ...existingProfileData,
      uid: userAuth.uid,
      createdAt: createdAtDate,
      isNewUser: existingProfileData.isNewUser || false, // Reflect stored isNewUser status or default to false
    } as UserProfile;
  }
};

export const onAuthStateChangedListener = (
  callback: (user: FirebaseUser | null) => void
): AbortController | (() => void) => { // Return type can be unsubscribe function or AbortController for more modern patterns
  const controller = new AbortController();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!controller.signal.aborted) {
      callback(user);
    }
  }, (error) => {
    console.error("onAuthStateChangedListener error:", error);
    if (!controller.signal.aborted) {
      callback(null); // Treat errors as "no user"
    }
  });

  // Return a function to unsubscribe, mimicking original Firebase unsubscribe
  return () => {
    controller.abort();
    unsubscribe();
  };
};


export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('showLoginBonusPopup'); 
      console.log("signOutUser: Cleared 'showLoginBonusPopup' flag.");
    }
    console.log("signOutUser: User signed out successfully.");
  } catch (error) {
    console.error('Error signing out:', (error as Error).message);
  }
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  if (!uid) {
    console.log("getUserProfile: UID is null or undefined, returning null.");
    return null;
  }

  const userDocRef = doc(db, 'users', uid);
  try {
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt instanceof Date
          ? data.createdAt
          : new Date(); 
      
      console.log(`getUserProfile: Found profile for UID ${uid}.`);
      return { ...(data as Omit<UserProfile, 'createdAt' | 'uid'>), uid, createdAt } as UserProfile;
    } else {
      console.log(`getUserProfile: No profile found for UID ${uid}.`);
      return null;
    }
  } catch (error) {
    console.error(`getUserProfile: Error fetching profile for UID ${uid}:`, (error as Error).message);
    return null; // Propagate null on error to avoid breaking AuthContext
  }
};

export const updateUserDocument = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  if (!uid) throw new Error("User ID is required to update document.");
  const userDocRef = doc(db, 'users', uid);
  try {
    if (data.walletBalance !== undefined && data.walletBalance < 0) {
      console.warn(`updateUserDocument: Attempted to set negative wallet balance for ${uid}. Setting to 0.`);
      data.walletBalance = 0;
    }
    await updateDoc(userDocRef, data);
    console.log(`updateUserDocument: Successfully updated document for UID ${uid} with data:`, data);
  } catch (error) {
    console.error('Error updating user document:', (error as Error).message);
    throw error;
  }
};

export const updateUserPassword = async (newPassword: string, currentPassword?: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in.");

  // Re-authentication is only needed if the user signed up with email/password.
  const emailProvider = user.providerData.find(p => p.providerId === EmailAuthProvider.PROVIDER_ID);

  if (emailProvider && currentPassword) {
    if (!user.email) throw new Error("User email is not available for re-authentication.");
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      console.log(`updateUserPassword: Attempting to re-authenticate user ${user.uid}.`);
      await reauthenticateWithCredential(user, credential);
      console.log(`updateUserPassword: User ${user.uid} re-authenticated successfully.`);
    } catch (error) {
      console.error("Re-authentication failed:", error);
      // Provide a more specific error message for common re-auth failures
      if ((error as any).code === 'auth/wrong-password') {
        throw new Error("Current password incorrect. Re-authentication failed.");
      }
      throw new Error("Re-authentication failed. Please check your current password.");
    }
  } else if (emailProvider && !currentPassword) {
    // This case should ideally be prevented by UI if currentPassword is required for email users
    console.warn("updateUserPassword: Attempting to change password for email user without current password. This might fail depending on session freshness.");
  }
  // For users signed in via Google or other providers, or if currentPassword wasn't needed/provided,
  // proceed directly to updatePassword. Firebase handles whether this is allowed.
  try {
    await firebaseUpdatePassword(user, newPassword);
    console.log(`updateUserPassword: Password updated successfully for user ${user.uid}.`);
  } catch (error) {
    console.error('Error updating password:', (error as Error).message);
    // Add more specific error handling if needed (e.g., auth/weak-password)
    throw error;
  }
};
