import React from "react";
import { NavLink } from "react-router-dom";

const PrimaryButton = (props) => {
    const {path, Icon, text}=props;
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `w-full text-slate-700 dark:text-slate-100 p-2 text-lg rounded-lg cursor-pointer flex justify-center lg:justify-normal gap-3 items-center border border-slate-300/70 dark:border-slate-600/70 transition-colors
    ${isActive ? "bg-sky-100 dark:bg-slate-800 border-b-2 border-b-sky-600 text-sky-700 dark:text-sky-300" : "bg-white/80 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/40"}`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="hidden lg:block">{text}</span>
    </NavLink>
  );
};

export default PrimaryButton;
