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
      <div className="fixed bottom-0 left-0 right-0 z-20 h-[var(--mobile-nav-height)] flex items-center justify-between px-2 py-2 md:static md:z-auto md:h-auto md:w-14 lg:w-56 md:min-h-screen md:pt-16 md:flex-col md:justify-between md:gap-2 md:px-1 md:py-0 bg-white/95 dark:bg-slate-900/95 md:bg-white/85 md:dark:bg-slate-900/60 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 backdrop-blur-md">
        {/* upper  */}
        <div className="w-full">
          <ul className="flex w-full items-center justify-between gap-1 md:flex-col md:gap-3 md:justify-around md:p-1">
            <li className="flex-1 md:w-full md:flex-none flex">
              <PrimaryButton path="/" Icon={House} text="Home" />
            </li>

            <li className="hidden md:flex md:flex-row md:w-full lg:p-3 text-center text-lg items-center gap-2">
              <div className="hidden lg:block border-2 border-slate-300 dark:border-slate-600 rounded-xl h-0 w-full"></div>
              <NavLink to="/chat" className="text-sky-600 dark:text-sky-400 font-semibold">
                Chat
              </NavLink>
              <div className="hidden lg:block border-2 border-slate-300 dark:border-slate-600 rounded-xl h-0 w-full"></div>
            </li>

            <li className="flex-1 md:w-full md:flex-none">
              <PrimaryButton
                path="/chat/global-chat"
                Icon={MessageSquareDot}
                text="Global chat"
              />
            </li>
            <li className="flex-1 md:w-full md:flex-none">
              <PrimaryButton
                path="/chat/random-chat"
                Icon={Shuffle}
                text="Random chat"
              />
            </li>
            <li className="flex-1 md:w-full md:flex-none">
              <PrimaryButton
                path="/chat/chat-bot"
                Icon={BotMessageSquare}
                text="ChatBot"
              />
            </li>

            <li className="hidden md:block md:w-full md:border-t-2 md:border-slate-300/80 md:dark:border-slate-600/60 md:pt-2">
              <PrimaryButton 
              path="/chat/review" 
              Icon={Star} 
              text="Review us" />
            </li>

            <li className="flex-1 md:hidden">
              <PrimaryButton
                path="/chat/review"
                Icon={Star}
                text="Review"
              />
            </li>
          </ul>
        </div>

        {/* lower  */}
        <div className="hidden md:flex pb-2 flex-col lg:flex-row gap-2 py-3 px-1 border-t-2 border-slate-300 dark:border-slate-600 w-full">
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
