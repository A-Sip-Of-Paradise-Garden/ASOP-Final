import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage, auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const userProfilesCollection = collection(db, "user-profiles");

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const createUserProfile = async (newUserProfileData, profilePicture) => {
    try {
      if (!profilePicture) throw new Error("Please upload an image file");
      const fileLocation = `profilePictures/${new Date().getTime()}_${profilePicture.name}`;
      const filesFolderRef = ref(storage, fileLocation);
      await uploadBytes(filesFolderRef, profilePicture);
      await addDoc(userProfilesCollection, {
        ...newUserProfileData,
        profilePicture: fileLocation,
        uid: user.uid,
      });
      setUserProfile(newUserProfileData);
      navigate("/");
    } catch(err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ signup, user, logout, login, logInWithGoogle, createUserProfile, userProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
