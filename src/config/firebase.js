import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ASOP Draft
const firebaseConfig = {
  apiKey: "AIzaSyACLrwV5qyCBr1OIKg4WeG91LG_uceTKTQ",
  authDomain: "asop-test.firebaseapp.com",
  projectId: "asop-test",
  storageBucket: "asop-test.appspot.com",
  messagingSenderId: "460234170888",
  appId: "1:460234170888:web:c9b5a3d1f5535de04227bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
