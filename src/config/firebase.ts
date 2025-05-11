import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCderpK8KI7MmKH0rQXwAfwTY2cWYlbh1E",
  authDomain: "bajibuz-3ff96.firebaseapp.com",
  projectId: "bajibuz-3ff96",
  storageBucket: "bajibuz-3ff96.appspot.com", // Corrected: was firebasestorage.app, should be appspot.com for default bucket
  messagingSenderId: "596094661600",
  appId: "1:596094661600:web:37833b6dbf7f2eefc37185",
  measurementId: "G-GW4M2PSLXN"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
} else {
  // In a server environment, analytics might not be applicable or available.
  // You might initialize server-side admin SDK differently if needed.
  // For client-side Firebase SDK, analytics is set to undefined here.
  analytics = undefined;
}


export { app, auth, db, analytics };
