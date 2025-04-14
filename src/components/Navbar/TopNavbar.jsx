import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProfileButton from "../Buttons/ProfileButton";
import LogoutButton from "../Buttons/LogoutButton";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full text-lg fixed flex flex-row justify-between items-center px-4 py-2 md:px-12 md:pt-6 md:pb-0 z-10 backdrop-blur-md">
        {/* left */}
        <Link to="/" className="flex text-2xl items-center gap-2">
          <img src="/icons/logo.png" alt="vikesh" className="w-8" />
          VITCHAT
        </Link>

        {/* middle - desktop */}
        <div className="hidden md:block min-w-[35vw] bg-gray-600/40 py-2 px-4 rounded-3xl">
          <ul className="w-full flex flex-row justify-around items-center">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => `${isActive ? "text-blue-400 font-bold" : ""}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => `${isActive ? "text-blue-400 font-bold" : ""}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `${isActive ? "text-blue-400 font-bold" : ""}`}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chat" 
                className={({isActive}) => `${isActive ? "text-blue-400 font-bold" : ""}`}
              >
                Chat
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* right */}
        <div className="hidden md:flex flex-row gap-4 items-center">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-800/95 backdrop-blur-md z-10 pt-4 pb-6 px-4 shadow-lg transition-all duration-300">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-blue-400 font-bold bg-gray-700" : "text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-blue-400 font-bold bg-gray-700" : "text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-blue-400 font-bold bg-gray-700" : "text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chat" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-blue-400 font-bold bg-gray-700" : "text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </NavLink>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <span className="text-white">Theme</span>
              <ModeToggle />
            </li>
            {user ? (
              <>
                <li>
                  <ProfileButton 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-700"
                  />
                </li>
                <li>
                  <LogoutButton 
                    className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="block py-2 px-4 rounded-lg text-white bg-blue-500 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;