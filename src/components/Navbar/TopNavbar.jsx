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
  const hasUserImage = Boolean(user?.image && user.image.trim());
  const userInitial = (user?.name?.[0] || "U").toUpperCase();

  return (
    <>
      <div className="w-full text-lg fixed flex flex-row justify-between items-center px-4 py-2 md:px-12 md:pt-4 md:pb-2 z-10 backdrop-blur-md bg-white/75 dark:bg-slate-950/65 border-b border-slate-200/80 dark:border-slate-700/70">
        {/* left */}
        <Link to="/" className="flex text-2xl items-center gap-2 font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <img src="/icons/logo.png" alt="vikesh" className="w-8" />
          VITCHAT
        </Link>

        {/* middle - desktop */}
        <div className="hidden md:block min-w-[35vw] bg-slate-100/85 dark:bg-slate-800/70 py-2 px-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <ul className="w-full flex flex-row justify-around items-center">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => `${isActive ? "text-sky-600 dark:text-sky-400 font-bold" : "text-slate-700 dark:text-slate-200"}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => `${isActive ? "text-sky-600 dark:text-sky-400 font-bold" : "text-slate-700 dark:text-slate-200"}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `${isActive ? "text-sky-600 dark:text-sky-400 font-bold" : "text-slate-700 dark:text-slate-200"}`}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chat" 
                className={({isActive}) => `${isActive ? "text-sky-600 dark:text-sky-400 font-bold" : "text-slate-700 dark:text-slate-200"}`}
              >
                Chat
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none text-slate-800 dark:text-slate-100"
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
                {hasUserImage ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover border border-gray-300/60"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-blue-600/80 text-white flex items-center justify-center font-semibold border border-gray-300/60">
                    {userInitial}
                  </div>
                )}
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
              className="px-4 py-1 cursor-pointer rounded-3xl bg-slate-200/90 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 pt-4 pb-6 px-4 shadow-lg transition-all duration-300 border-b border-slate-200 dark:border-slate-700">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-sky-600 dark:text-sky-400 font-bold bg-slate-100 dark:bg-slate-800" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-sky-600 dark:text-sky-400 font-bold bg-slate-100 dark:bg-slate-800" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-sky-600 dark:text-sky-400 font-bold bg-slate-100 dark:bg-slate-800" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chat" 
                className={({isActive}) => `block py-2 px-4 rounded-lg ${isActive ? "text-sky-600 dark:text-sky-400 font-bold bg-slate-100 dark:bg-slate-800" : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </NavLink>
            </li>
            <li className="flex items-center justify-between px-4 py-2">
              <span className="text-slate-700 dark:text-slate-200">Theme</span>
              <ModeToggle />
            </li>
            {user ? (
              <>
                <li>
                  <ProfileButton 
                    onAction={() => setMobileMenuOpen(false)}
                    className="block w-full text-left py-2 px-4 rounded-lg text-white hover:bg-gray-700"
                  />
                </li>
                <li>
                  <LogoutButton 
                    onAction={() => setMobileMenuOpen(false)}
                    className="py-3 text-base"
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="block py-2 px-4 rounded-lg text-white bg-sky-600 hover:bg-sky-700 text-center"
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