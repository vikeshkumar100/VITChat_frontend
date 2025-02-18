import React from "react";
import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <>
      <div className="fixed md:h-screen w-full md:pt-16 md:w-56 pt-[5vh] bg-gray-800">
        {/* upper  */}
        <div>
          <ul className="flex flex-row gap-3 justify-around w-full items-center p-1 md:flex-col">
            <li className="w-full flex">
              <NavLink to="/" className="bg-gray-600 w-full p-2 text-lg rounded-lg cursor-pointer">Home</NavLink>
            </li>
            <li className=" w-full p-3 text-center text-lg text-gray-400 flex flex-row items-center gap-2">
              <div  className="border-2 border-gray-600 rounded-xl h-0 w-full"></div>
              Chat
              <div className="border-2 border-gray-600 rounded-xl h-0 w-full"></div>
            </li>
            <li className="w-full flex">
              <NavLink to="/chat" className="bg-gray-600 w-full p-2 text-lg rounded-lg cursor-pointer">Global chat</NavLink>
            </li>
            <li className="w-full flex">
              <NavLink to="/random-chat" className="bg-gray-600 w-full p-2 text-lg rounded-lg cursor-pointer">Random chat</NavLink>
            </li>
            <li className="w-full flex">
              <NavLink to="/chat-bot" className="bg-gray-600 w-full p-2 text-lg rounded-lg cursor-pointer">ChatBot</NavLink>
            </li>
          </ul>
        </div>

        {/* lower  */}
        <div></div>
      </div>
    </>
  );
};

export default LeftNavbar;
