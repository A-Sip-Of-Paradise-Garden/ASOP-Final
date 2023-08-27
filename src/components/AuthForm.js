import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const buttonText = pathname === "/login" ? "Login" : "Signup";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (pathname === "/login") {
      logIn();
    } else {
      signUp();
    };
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto gap-4">
      <form
        className="flex flex-col w-full items-center gap-4"
        onSubmit={onSubmitHandler}
      >
        <div className="flex w-full flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-2 rounded py-2 px-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border-2 rounded py-3"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full py-2" type="submit">
          {buttonText}
        </Button>
      </form>
      <hr className="border" />
      <Button
        className="w-full py-2 border-2"
        color="white"
        onClick={logInWithGoogle}
      >
        <FcGoogle className="text-lg" />
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
