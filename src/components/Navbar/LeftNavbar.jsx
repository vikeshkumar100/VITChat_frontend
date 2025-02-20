import {
  BotMessageSquare,
  House,
  LogOut,
  MessageSquareDot,
  Shuffle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ChatButton from "../Buttons/ChatButton";
import ProfileSheet from "../ProfileSheet/ProfileSheet";

const LeftNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") !== null
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="fixed flex flex-col gap-2 lg:justify-between w-12 h-screen md:pt-16 lg:w-56 pt-[7vh] bg-gray-800">
        {/* upper  */}
        <div>
          <ul className="flex flex-col gap-3 justify-around w-full items-center p-1">
            <li className="w-full flex">
              <ChatButton path="/" Icon={House} text="Home" />
            </li>

            <li className="flex flex-row w-full lg:p-3 text-center text-lg text-gray-400 items-center gap-2">
              <div className="hidden lg:block border-2 border-gray-600 rounded-xl h-0 w-full"></div>
              <NavLink to="/chat" className="text-blue-400 font-semibold">
                Chat
              </NavLink>
              <div className="hidden lg:block border-2 border-gray-600 rounded-xl h-0 w-full"></div>
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
        <div className="pb-2 flex flex-col lg:flex-row gap-2 py-3 px-1 border-t-2 border-gray-600 ">
          {/* profile button */}
          <div>
            <span>
              <ProfileSheet
                name={user.name}
                email={user.email}
                image={user.image}
              />
            </span>
          </div>

          {/* logout button  */}
          <button
            onClick={handleLogout}
            className="w-full p-2 text-lg rounded-lg cursor-pointer flex justify-center lg:justify-normal gap-3 items-center bg-red-600/70"
          >
            <span className="w-5 h-5">
              <LogOut />
            </span>
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftNavbar;
