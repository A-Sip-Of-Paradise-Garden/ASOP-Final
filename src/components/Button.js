import React from "react";
import { colors } from "../Styles/generalStyles";

const Button = ({ color, type, children, ...props }) => {
  return (
    <button
      className={`${
        color ? colors[color] : colors["emerald"]
      } py-1 px-2 rounded`}
      type={type ? type : "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
