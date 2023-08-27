import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";
import AuthRoute from "./components/AuthRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { AUTH_TYPES } from "./constants/authTypes";

const App = () => {
  const { UNAUTHENTICATED } = AUTH_TYPES;

  return (
    <AuthContextProvider>
      <div className="w-full h-full">
        <NavBar />
        <div className="container mx-auto text-black">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthRoute mode={UNAUTHENTICATED}>
                  <AuthForm />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute mode={UNAUTHENTICATED}>
                  <AuthForm />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default App;
