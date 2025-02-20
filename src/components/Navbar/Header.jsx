import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
const Header = () => {
  return (
    <div className="text-white flex justify-between items-center fixed top-0 w-full text-3xl bg-black/40 backdrop-blur-md text-center  border-b-2 z-10 border-gray-600 py-2 px-6 max-h-12 md:max-h-14">
      <Link to="/" className="flex items-center gap-2"><img src="/icons/logo.png" alt="vikesh" className="w-8"/>VITCHAT</Link>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
