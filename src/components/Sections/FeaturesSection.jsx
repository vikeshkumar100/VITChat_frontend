import React from "react";
import FeaturesCard from "@/components/Card/FeaturesCard";
const FeaturesSection = () => {
  return (
    <div className="h-auto w-full flex flex-col items-center justify-start pt-40 pb-32 gap-28">
      <h2 className="text-3xl md:text-6xl font-bold bg-blue-500 p-3 w-full text-center">
        Features You’ll Love
      </h2>
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
        <FeaturesCard
          route="/chat/global-chat"
          icon="🌍"
          title="Global Chat"
          description="Join discussions with VIT students across all campuses and stay connected."
        />
        <FeaturesCard
          route="/chat"
          icon="🛡️"
          title="Privacy & Security"
          description="Exclusive to VIT students. Your messages are end-to-end secure, and we do not store them."
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
      </div>
      <div className="text-3xl md:text-4xl">Upcoming features ⏳</div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
        <FeaturesCard
          route="/"
          icon="🚗"
          title="Cab Sharing"
          description="Share cabs with other students and save money on your daily commute."
        />
        <FeaturesCard
          route="/"
          icon="🎉"
          title="Event Announcements"
          description="Stay updated with the latest events happening in and around VIT."
        />
        <FeaturesCard
          route="/"
          icon="💬"
          title="Lost & Found"
          description="Lost something? Post it here and get it back from the finder."
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
