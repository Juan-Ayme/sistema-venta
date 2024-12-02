import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD2FYtutzpJBdI7tmdL0w-BbTggzTcrMhY",
  authDomain: "venta-1f033.firebaseapp.com",
  projectId: "venta-1f033",
  storageBucket: "venta-1f033.firebasestorage.app",
  messagingSenderId: "1081867570155",
  appId: "1:1081867570155:web:9c5d0421b2555b9cd5e7ae",
  measurementId: "G-W1QR19CQ1J"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics conditionally (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, db, auth, analytics };