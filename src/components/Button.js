import React from "react";
import { colors } from "../constants/generalStyles";

const Button = ({ color, type, children, className, ...props }) => {
  return (
    <button
      className={`${
        color ? colors[color] : colors["emerald"]
      } flex items-center justify-center gap-2 py-1 px-2 rounded ${className}`}
      type={type ? type : "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
