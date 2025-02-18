import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="text-white flex justify-between items-center fixed top-0 w-full text-3xl bg-black/40 backdrop-blur-md text-center p-2 border-b-2 z-10 border-gray-600 px-6">
      <Link
        to="/">
        VITCHAT
      </Link>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
