import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
const Header = () => {
  return (
    <div className="text-slate-900 dark:text-slate-100 flex justify-between items-center fixed top-0 w-full text-2xl md:text-3xl bg-white/80 dark:bg-slate-950/70 backdrop-blur-md text-center border-b z-10 border-slate-200 dark:border-slate-700 py-2 px-4 md:px-6 min-h-12 md:min-h-14">
      <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight"><img src="/icons/logo.png" alt="vikesh" className="w-8"/>VITCHAT</Link>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
