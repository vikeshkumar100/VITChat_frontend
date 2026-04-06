import React, { Suspense, useState } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ChatHome = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden pt-14 md:pt-16 pb-20 md:pb-0">
      {/* Immediate Chat Box - Always visible */}
      <div className="relative z-[9] mx-4 mt-4 md:mt-8 md:mx-8 md:max-w-lg md:ml-auto text-base md:text-xl bg-gray-700/85 dark:bg-gray-700/30 backdrop-blur-lg p-4 md:p-5 rounded-xl shadow-md text-blue-100 font-sans shrink-0">
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
      <div className="flex min-h-0 flex-1 w-full items-center justify-center p-2 md:p-4">
        <div className="hidden md:block relative w-full h-full min-h-0 overflow-hidden rounded-3xl">
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/EdkG9NcJg5BcqIQA/scene.splinecode"
              onLoad={() => setIsSplineLoaded(true)}
              className={`h-full w-full transition-opacity duration-1000 ${
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

        <div className="md:hidden w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/55 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Ready to Chat?</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Jump into global chat and connect with VITians instantly.
          </p>
          <Link
            to="/chat/global-chat"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open Global Chat <SquareArrowOutUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;