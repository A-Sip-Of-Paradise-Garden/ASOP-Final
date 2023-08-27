import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="container mx-auto text-black">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
