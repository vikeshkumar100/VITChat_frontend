import React from "react";
import { AnimatedGridPatternDemo } from "../../components/Backgrounds/GridBG";
import { RainbowButton } from "../../components/magicui/rainbow-button";
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { VelocityScroll } from "../../components/magicui/scroll-based-velocity";
import { Link } from "react-router-dom";
import FeaturesCard from "@/components/Card/FeaturesCard";

const Home = () => {
  return (
    <div className="relative min-h-screen max-w-full flex flex-col items-center justify-center">
      {/* background  */}
      <div className="absolute h-screen inset-0 -z-10">
        <AnimatedGridPatternDemo />
      </div>
      {/* blue gradient bg */}
      <div className="absolute top-1/3 w-full h-32 bg-blue-400 rounded-full opacity-50 dark:opacity-30 blur-[180px]"></div>

      {/*hero section */}
      <div className="lg:text-5xl md:text-4xl text-xl min-h-screen max-w-full text-center flex flex-col items-center justify-center gap-7 p-8 lg:px-24 md:pt-20">
        <h2>
          <TypingAnimation className="md:text-5xl text-3xl">
            Welcome to VITChat!
          </TypingAnimation>
        </h2>
        <h1 className="font-bold">
          Connect, Chat, and Collaborate – The Ultimate Chat Platform for
          <span className="text-blue-400"> VITians!</span>
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

      {/* marquee  */}
      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll defaultVelocity={1}>
          🌍Global Chat • 💬Random Chat • 🤖AI Chatbot • 🔒Secure VIT Email
          Login • ⚡Real-Time Messaging
        </VelocityScroll>
      </div>

      {/* features */}
      <div className="min-h-screen w-full flex flex-col items-center justify-top pt-40 gap-28">
        <h2 className="text-3xl md:text-6xl font-bold bg-blue-600 p-4 w-full">
        Why VITChat? – Features You’ll Love
        </h2>
        <div className="w-2/3 flex flex-col md:flex-row items-center justify-center gap-10">
          <FeaturesCard
            route="/chat/global-chat"
            icon="🌍"
            title="Global Chat"
            description="Join discussions with VIT students across all campuses and stay connected."
          />
          <FeaturesCard
            route="/chat/random-chat"
            icon="💬"
            title="Random Chat"
            description="Chat with random students and make new friends. You never know who you might meet!"
          />
          <FeaturesCard
            route="/chat/chat-bot"
            icon="🤖"
            title="AI Chatbot"
            description="Get instant answers to your queries from our AI chatbot."
          />
          <FeaturesCard
            route="/chat"
            icon="🛡️"
            title="Privacy & Security"
            description="Exclusive to VIT students. Your messages are end-to-end secure, and we do not store them."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
