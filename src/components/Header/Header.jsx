import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link
      to="/"
      className="text-white fixed top-0 w-full text-3xl bg-black/40 backdrop-blur-md text-center p-2 border-b-2 z-10 border-gray-600"
    >
      VITCHAT
    </Link>
  );
};

export default Header;
