import { Link } from "react-router-dom";
import { colors } from "../constants/generalStyles";
import Button from "./Button";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

export const URL_PATHS = [
  {
    name: "Events",
    path: "/events",
    requiresAuth: false,
  },
  {
    name: "Contact Us",
    path: "/contact",
    requiresAuth: false,
  },
  {
    name: "Members",
    path: "/members",
    requiresAuth: true,
    requiresAdmin: true,
  },
  {
    name: "Profile",
    path: "/profile",
    requiresAuth: true,
  },
  {
    name: "Payments",
    path: "/payment",
    requiresAuth: false,
  },
];

const NavBar = () => {
  const { user, userProfile, logout } = UserAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const URLS = URL_PATHS.filter((path) => {
    if (path.requiresAuth && !user) return false;
    return !(path.requiresAdmin && !userProfile?.isAdmin);

  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="flex justify-center w-full border-b-[1px] border-b-emerald-400 mb-4">
      <div className="flex container items-center justify-between h-[3rem] px-4">
        <Link to="/">Home</Link>
        <div className="flex gap-2 items-center">
          <div className="gap-2 items-center hidden md:flex">
            {URLS.map((path) => {
              return (
                <NavLink to={path.path} color={"greenUnderline"}>
                  {path.name}
                </NavLink>
              );
            })}
          </div>
          <div className="flex gap-2 items-center">
            {!user ? (
              <>
                <NavLink to="/login" color="hollow">
                  Login
                </NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            ) : (
              <Button onClick={logout} color="red">
                Signout
              </Button>
            )}
            <AiOutlineMenu
              className="rounded hover:bg-gray-300 text-2xl md:hidden"
              onClick={toggleMenu}
            />
            {menuVisible && <MobileMenu URLS={URLS} toggleMenu={toggleMenu} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ children, color, ...props }) => {
  return (
    <Link
      className={`${
        color ? colors[color] : colors["emerald"]
      } py-1 px-2 rounded`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavBar;
