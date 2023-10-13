import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./pages/Home/Home.css"
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";
import AuthRoute from "./components/AuthRoute";
import { UserAuth } from "./context/AuthContext";
import { AUTH_TYPES } from "./constants/authTypes";
import CreateProfileForm from "./components/CreateProfileForm";
import Profile from "./pages/Profile";
import MembersPage from "./pages/Members";

const App = () => {
  const { UNAUTHENTICATED, PROTECTED, ADMIN } = AUTH_TYPES;
  const { user, userProfile } = UserAuth();

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="container mx-auto text-black px-4">
        <Routes>
          {user && !userProfile ? (
            <Route path="*" element={<CreateProfileForm />} />
          ) : (
            <>
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
              <Route
                path="/profile"
                element={
                  <AuthRoute mode={PROTECTED}>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path="/members"
                element={
                  <AuthRoute mode={ADMIN}>
                    <MembersPage />
                  </AuthRoute>
                }
              />
            </>
          )}
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
