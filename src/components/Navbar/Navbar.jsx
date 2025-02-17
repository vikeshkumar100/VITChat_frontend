import React from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-green-400 flex flex-row justify-around items-center p-4">
        {/* left  */}
        <div>VITCHAT</div>

        {/* middle  */}
        <div className="min-w-[35vw] font-semibold">
          <ul className="w-full flex flex-row justify-around items-center">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/chat">Chat</NavLink>
            </li>
          </ul>
        </div>

        {/* right */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default Navbar;
