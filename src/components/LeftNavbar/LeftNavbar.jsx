import React from "react";
import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <>
      <div className="fixed md:h-screen w-full md:w-28 pt-[5vh] bg-green-400">
        <ul className="flex flex-row justify-around items-center p-1 md:flex-col">
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
            <NavLink to="/global-chat">Global chat</NavLink>
          </li>
          <li>
            <NavLink to="/chat-bot">Chatbot</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftNavbar;
