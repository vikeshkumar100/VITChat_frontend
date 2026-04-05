import {
  BotMessageSquare,
  House,
  MessageSquareDot,
  Shuffle,
  Star,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton";
import LogoutButton from "../Buttons/LogoutButton";
import ProfileButton from "../Buttons/ProfileButton";

const LeftNavbar = () => {
  return (
    <>
      <div className="flex flex-col gap-2 lg:justify-between w-12 min-h-screen md:pt-16 lg:w-56 pt-[7vh] bg-white/85 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-700 backdrop-blur-md">
        {/* upper  */}
        <div>
          <ul className="flex flex-col gap-3 justify-around w-full items-center p-1">
            <li className="w-full flex">
              <PrimaryButton path="/" Icon={House} text="Home" />
            </li>

            <li className="flex flex-row w-full lg:p-3 text-center text-lg items-center gap-2">
              <div className="hidden lg:block border-2 border-slate-300 dark:border-slate-600 rounded-xl h-0 w-full"></div>
              <NavLink to="/chat" className="text-sky-600 dark:text-sky-400 font-semibold">
                Chat
              </NavLink>
              <div className="hidden lg:block border-2 border-slate-300 dark:border-slate-600 rounded-xl h-0 w-full"></div>
            </li>

            <li className="w-full">
              <PrimaryButton
                path="/chat/global-chat"
                Icon={MessageSquareDot}
                text="Global chat"
              />
            </li>
            <li className="w-full">
              <PrimaryButton
                path="/chat/random-chat"
                Icon={Shuffle}
                text="Random chat"
              />
            </li>
            <li className="w-full">
              <PrimaryButton
                path="/chat/chat-bot"
                Icon={BotMessageSquare}
                text="ChatBot"
              />
            </li>

            <li className="w-full border-t-2 border-slate-300/80 dark:border-slate-600/60 pt-2">
              <PrimaryButton 
              path="/chat/review" 
              Icon={Star} 
              text="Review us" />
            </li>
          </ul>
        </div>

        {/* lower  */}
        <div className="pb-2 flex flex-col lg:flex-row gap-2 py-3 px-1 border-t-2 border-slate-300 dark:border-slate-600">
          {/* profile button */}
          <ProfileButton />

          {/* logout button  */}
          <LogoutButton compactOnMobile />
        </div>
      </div>
    </>
  );
};

export default LeftNavbar;
