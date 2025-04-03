import React from "react";
import FeaturesCard from "../Card/FeaturesCard";
import {
  Smartphone,
  Laptop,
  Tablet,
  MessageSquare,
  Sparkles,
  SmartphoneCharging,
} from "lucide-react";
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

      <section className="mt-24 -z-20 relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute -top-20 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="inline-block mb-4 text-blue-400 font-semibold uppercase tracking-widest text-sm">
              Universal Access
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Flawless Experience
              </span>
              <br />
              Across Every Device
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Vitchat's adaptive interface seamlessly transforms to deliver the
              perfect chat experience, whether you're on a phone, tablet, or
              desktop.
            </p>
          </div>

          {/* Device Gallery */}
          <div className="relative flex items-center justify-center mb-24 h-[600px]">
            {/* Desktop Mockup */}
            <div className="relative z-20 w-full max-w-5xl transform perspective-1000">
              <div className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                {/* Chat Interface Preview */}
                <div className="relative flex items-center justify-center mb-24 h-[600px] bg-[url('./src/assets/images/chatbot-pc.png')] bg-contain bg-no-repeat bg-center rounded-2xl shadow-lg overflow-hidden">
                  <div className="text-center space-y-4">
                    <MessageSquare className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
                    <span className="text-gray-400 font-medium"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mobile */}
            <div className="absolute -left-20 top-1/4 z-30 w-56 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="relative bg-gray-800 rounded-3xl border-2 border-gray-700 shadow-xl p-3">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full mt-2"></div>
                <div className="h-64 rounded-2xl bg-gray-700/50 flex items-center justify-center">
                  <SmartphoneCharging className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Floating Tablet */}
            <div className="absolute -right-20 bottom-1/4 z-30 w-72 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="relative bg-gray-800 rounded-2xl border-2 border-gray-700 shadow-xl p-4">
                <div className="h-80 rounded-xl bg-gray-700/50 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                desc: "Finger-friendly design with intuitive gestures and mobile-first navigation",
                color: "blue",
              },
              {
                icon: Tablet,
                title: "Tablet Ready",
                desc: "Perfect split-view layouts and enhanced multitasking capabilities",
                color: "purple",
              },
              {
                icon: Laptop,
                title: "Desktop Power",
                desc: "Full feature set with multi-window support and keyboard shortcuts",
                color: "pink",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-{feature.color}-400/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-${feature.color}-400/10 to-transparent`}
                >
                  <feature.icon
                    className={`w-8 h-8 text-${feature.color}-400`}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                <div className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-${feature.color}-400 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
