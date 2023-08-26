import { Link } from "react-router-dom";
import { colors } from "../Styles/generalStyles";
import Button from "./Button";

const NavBar = () => {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-b-emerald-400">
      <div className="flex container items-center justify-between h-[3rem]">
        <Link to="/">
          Home
        </Link>
        <div className="flex gap-2">
          <NavLink color="hollow" to="/signin">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <Button color="red">Signout</Button>
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
