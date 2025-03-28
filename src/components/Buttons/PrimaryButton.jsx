import React from "react";
import { NavLink } from "react-router-dom";

const PrimaryButton = (props) => {
    const {path, Icon, text}=props;
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `w-full text-white p-2 text-lg rounded-lg cursor-pointer flex justify-center lg:justify-normal gap-3 items-center border border-gray-500/20
    ${isActive ? "bg-gray-600 border-b-2 border-b-blue-600" : "dark:bg-gray-800/10 bg-gray-800/40"}`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="hidden lg:block">{text}</span>
    </NavLink>
  );
};

export default PrimaryButton;
