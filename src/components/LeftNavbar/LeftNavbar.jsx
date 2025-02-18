import {
  BotMessageSquare,
  House,
  LogOut,
  MessageSquareDot,
  Shuffle,
  UserRoundPen,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import ChatButton from "../Buttons/ChatButton";

const LeftNavbar = () => {
  return (
    <> 
      <div className="fixed flex flex-col justify-between md:h-screen w-12 h-screen md:pt-16 md:w-56 pt-[7vh] bg-gray-800">
        {/* upper  */}
        <div>
          <ul className="flex flex-col gap-3 justify-around w-full items-center p-1">
            <li className="w-full flex">
              <ChatButton path="/" Icon={House} text="Home" />
            </li>

            <li className="hidden md:flex flex-row w-full p-3 text-center text-lg text-gray-400 items-center gap-2">
              <div className="border-2 border-gray-600 rounded-xl h-0 w-full"></div>
              <NavLink to="/chat" className="text-blue-400 font-semibold">
                Chat
              </NavLink>
              <div className="border-2 border-gray-600 rounded-xl h-0 w-full"></div>
            </li>

            <li className="w-full flex">
              <ChatButton
                path="/chat/global-chat"
                Icon={MessageSquareDot}
                text="Global chat"
              />
            </li>
            <li className="w-full flex">
              <ChatButton
                path="/chat/random-chat"
                Icon={Shuffle}
                text="Random chat"
              />
            </li>
            <li className="w-full flex">
              <ChatButton
                path="/chat/chat-bot"
                Icon={BotMessageSquare}
                text="ChatBot"
              />
            </li>
          </ul>
        </div>

        {/* lower  */}
        <div className="pb-2 flex flex-col md:flex-row gap-2 px-1">

          {/* profile button */}
          <NavLink
            to="/"
            className="w-full p-2 text-lg rounded-lg cursor-pointer flex justify-center md:justify-normal gap-3 items-center bg-blue-600/70">
            <span className="w-5 h-5">
            <UserRoundPen />
            </span>
            <span className="hidden md:block">Profile</span>
          </NavLink>

          {/* logout button  */}
          <NavLink
            to="/"
            className="w-full p-2 text-lg rounded-lg cursor-pointer flex justify-center md:justify-normal gap-3 items-center bg-red-600/70">
            <span className="w-5 h-5">
              <LogOut />
            </span>
            <span className="hidden md:block">Logout</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LeftNavbar;
