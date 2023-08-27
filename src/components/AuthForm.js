import { useState } from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const { signup, login, logInWithGoogle } = UserAuth();
  const routeName = pathname === "/login" ? "Login" : "Signup";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (pathname === "/login") {
      login(email, password);
    } else {
      signup(email, password);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto gap-4">
      <h1 className="text-2xl font-bold">{routeName}</h1>
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
            className="border-2 rounded py-2 px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full py-2" type="submit">
          {routeName}
        </Button>
      </form>
      <hr className="border w-full" />
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
