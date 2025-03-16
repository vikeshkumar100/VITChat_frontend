import React from "react";
import { AnimatedGridPatternDemo } from "../../components/Backgrounds/GridBG";
import { RainbowButton } from "../../components/magicui/rainbow-button";
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { VelocityScroll } from "../../components/magicui/scroll-based-velocity";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen max-w-full flex flex-col items-center justify-center">
      {/* background  */}
      <div className="absolute inset-0 -z-10">
        <AnimatedGridPatternDemo />
      </div>

      {/*hero section */}
      <div className="md:text-4xl  text-xl min-h-screen max-w-full text-center flex flex-col items-center justify-center gap-5 p-8">
        <h2>
          <TypingAnimation className="md:text-5xl">
            Welcome to VITChat!
          </TypingAnimation>
        </h2>
        <h1 className="font-bold">
          Connect, Chat, and Collaborate – The Ultimate Chat Platform for
          VITians!
        </h1>
        <h4 className="text-lg text-gray-500 md:w-2/3 backdrop-blur-sm p-2">
          VITChat is a real-time chat platform designed exclusively for VIT
          students. Join global discussions, chat randomly, and get instant
          answers from our chatbot!
        </h4>
        <Link to="/chat">
          <RainbowButton className="md:text-2xl">Join Chat Now</RainbowButton>{" "}
        </Link>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll defaultVelocity={1}>
          🌍Global Chat • 💬Random Chat • 🤖AI Chatbot • 🔒Secure VIT Email
          Login • ⚡Real-Time Messaging
        </VelocityScroll>
      </div>
      <div className="absolute bottom-36 w-full h-32 bg-blue-400 rounded-full opacity-100 dark:opacity-30 blur-[180px]"></div>
    </div>
  );
};

export default Home;
