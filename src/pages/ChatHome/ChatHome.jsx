import React, { Suspense, useState } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ChatHome = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <div className="relative w-full">
      {/* Immediate Chat Box - Always visible */}
      <div className="fixed w-[30vw] top-[25vh] right-[2vw] text-lg md:text-2xl bg-gray-600/80 dark:bg-gray-600/20 backdrop-blur-lg p-5 rounded-xl shadow-md hover:shadow-current text-blue-200 font-sans z-[9]">
        <Link
          to="/chat/global-chat"
          className="text-blue-400 hover:text-blue-500 flex items-center gap-2"
        >
          Global chat is open! <SquareArrowOutUpRight size={20} />
        </Link>
        <div className="mt-3 text-gray-300">
          Discuss projects, share ideas, or just hang out with fellow VITians.
          Dive into real-time conversations!
        </div>
      </div>

      {/* Spline Container with Loading State */}
      <div className="flex w-full justify-center items-center h-screen p-4">
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/EdkG9NcJg5BcqIQA/scene.splinecode"
            onLoad={() => setIsSplineLoaded(true)}
            className={`transition-opacity duration-1000 ${
              isSplineLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </Suspense>

        {/* Loading Indicator */}
        {!isSplineLoaded && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <div className="animate-pulse">Loading 3D environment...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHome;