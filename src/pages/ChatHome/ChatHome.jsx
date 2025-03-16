import React from "react";
import Spline from "@splinetool/react-spline";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ChatHome = () => {
  return (
    <>
      {/* spline robot  */}
      <div className="flex w-full justify-center items-center h-screen p-4">
        <Spline scene="https://prod.spline.design/EdkG9NcJg5BcqIQA/scene.splinecode" />
      </div>

      {/* box */}
      <div className="fixed w-[30vw] top-[25vh] right-[2vw] text-lg md:text-2xl bg-gray-600/80 dark:bg-gray-600/20 backdrop-blur-lg p-5 rounded-xl shadow-md hover:shadow-current text-blue-200 font-sans">
        <Link
          to="/chat/global-chat"
          className="text-blue-400 hover:text-blue-500"
        >
          Global chat is open! <SquareArrowOutUpRight />
        </Link>
        <div>
          Discuss projects, share ideas, or just hang out with fellow VITians.
          Dive into real-time conversations!
        </div>
      </div>
    </>
  );
};

export default ChatHome;
