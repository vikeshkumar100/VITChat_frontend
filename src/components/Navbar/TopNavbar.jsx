import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import ProfileSheet from "../ProfileSheet/ProfileSheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileButton from "../Buttons/ProfileButton";
import LogoutButton from "../Buttons/LogoutButton";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  return (
    <>
      <div className="w-full text-lg fixed flex flex-row justify-between items-center px-4 py-2 md:px-12 md:pt-6 md:pb-0">
        {/* left  */}
        <Link to="/" className="flex text-2xl items-center gap-2">
          <img src="/icons/logo.png" alt="vikesh" className="w-8" />
          VITCHAT
        </Link>

        {/* middle  */}
        <div className="hidden md:block min-w-[35vw] bg-gray-500/50 py-2 px-4 rounded-3xl">
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
        <div className="flex flex-row gap-4 items-center">
          <ModeToggle />
          {user ? (
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.image}
                  alt={user.name}
                  width={45}
                  className="rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <ProfileButton />
                  {/* logout button  */}
                  <LogoutButton />
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-1 cursor-pointer rounded-3xl bg-gray-400/50"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
