
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCderpK8KI7MmKH0rQXwAfwTY2cWYlbh1E",
  authDomain: "bajibuz-3ff96.firebaseapp.com",
  projectId: "bajibuz-3ff96",
  storageBucket: "bajibuz-3ff96.firebasestorage.app",
  messagingSenderId: "596094661600",
  appId: "1:596094661600:web:37833b6dbf7f2eefc37185",
  measurementId: "G-GW4M2PSLXN"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined; // analytics can be undefined if not on client

if (typeof window !== 'undefined') { // Ensure Firebase is initialized only on the client-side
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = getAnalytics(app);
} else {
    // Provide placeholder/mock objects for server-side rendering or testing if needed
    app = {} as FirebaseApp; // Placeholder
    auth = {} as Auth; // Placeholder
    db = {} as Firestore; // Placeholder
    analytics = undefined; // Placeholder
}


export { app, auth, db, analytics };
