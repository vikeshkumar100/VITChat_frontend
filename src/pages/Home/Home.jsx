import React from "react";
import { AnimatedGridPatternDemo } from "../../components/Backgrounds/GridBG";
import { RainbowButton } from "../../components/magicui/rainbow-button";
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { VelocityScroll } from "../../components/magicui/scroll-based-velocity";
import { Link } from "react-router-dom";
import FeaturesSection from "@/components/Sections/FeaturesSection";
import AccordianFAQ from "@/components/Sections/AccordianFAQ";

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
          <span className="block text-red-500/70">
            *You can't login without VIT email*
          </span>
        </h4>
        <Link to="/chat">
          <RainbowButton className="md:text-2xl">Join Chat Now</RainbowButton>{" "}
        </Link>
      </div>

      {/* marquee  */}
      <div className="flex max-w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll defaultVelocity={1}>
          🌍Global Chat • 💬Random Chat • 🤖AI Chatbot • 🔒Secure VIT Email
          Login • ⚡Real-Time Messaging
        </VelocityScroll>
      </div>

      {/* features */}
      <FeaturesSection />

      {/* FAQ section  */}
      <AccordianFAQ />

      {/* CTA */}
      <Link to="/chat">
        <RainbowButton className="md:text-2xl">Join Chat Now</RainbowButton>{" "}
      </Link>
    </div>
  );
};

export default Home;
