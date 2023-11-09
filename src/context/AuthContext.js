import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage, auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

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
      console.log(err.message);
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
      const fileLocation = `profilePictures/${new Date().getTime()}_${
        profilePicture.name
      }`;
      const filesFolderRef = ref(storage, fileLocation);
      await uploadBytes(filesFolderRef, profilePicture);
      await setDoc(doc(db, "user-profiles", user.uid), {
        ...newUserProfileData,
        profilePicture: fileLocation,
        notifications: true,
      });
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserProfile(null);
        return;
      }
  
      const ref = doc(db, "user-profiles", currentUser.uid);
      const docSnap = await getDoc(ref);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        signup,
        user,
        logout,
        login,
        logInWithGoogle,
        createUserProfile,
        userProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
