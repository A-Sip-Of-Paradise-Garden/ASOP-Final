import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGkqYC-fo6LbpMFPP9fi5caS99GMnVAxM",
  authDomain: "asop-final.firebaseapp.com",
  projectId: "asop-final",
  storageBucket: "asop-final.appspot.com",
  messagingSenderId: "752957988415",
  appId: "1:752957988415:web:361de51c87ed267ceea28a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
