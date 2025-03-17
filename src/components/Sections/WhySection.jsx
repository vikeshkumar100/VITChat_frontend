import React from "react";

const WhySection = () => {
  return (
    <div className="h-auto w-full flex flex-col items-center pt-40 pb-20">
      <h2 className="text-3xl md:text-6xl font-bold p-3 w-full text-center border-y border-blue-500">
        Why VITChat?
      </h2>
      <p className="p-4 text-gray-500 max-w-3xl text-center">
        Right now, students rely on WhatsApp groups, Telegram, and unofficial
        Discord servers, but these are either private, unorganized, or full of
        spam.
      </p>

      <div className="w-full flex flex-col md:flex-row justify-around text-lg pt-10">
        {/* Problem Section */}
        <div className="md:w-1/2 p-6 max-w-2xl">
          <h3 className="text-3xl font-bold">The Problem: Lack of a Common Platform for VIT Students</h3>
          <p className="pt-6 text-red-700">
            VIT has thousands of students across different branches and campuses, but there's no single platform where students can easily communicate. For example:
          </p>
          <ul className="p-4 font-thin flex flex-col gap-4 list-disc list-inside">
            <li>A fresher wants to ask a senior about placement preparation but doesn’t know whom to approach.</li>
            <li>A hosteller wants to find a roommate but has no way to reach out to others.</li>
            <li>A student struggling with DSA wants to find peers to study together.</li>
            <li>Someone has lost their ID card and needs a quick way to spread the word.</li>
          </ul>
        </div>

        {/* center line  */}
        <div className="border border-blue-500"></div>

        {/* Solution Section */}
        <div className="md:w-1/2 p-6 max-w-2xl">
          <h3 className="text-3xl font-bold">The Solution: How Does VITChat Solve This?</h3>
          <p className="pt-6 text-green-700">
            VITChat is a dedicated chat platform exclusively for VIT students, solving these issues in multiple ways:
          </p>
          <ul className="p-4 font-thin flex flex-col gap-4 list-disc list-inside">
            <li>
              <strong>Global Chat –</strong> A common space where students from all batches can discuss placements, exams, and events.
              <p className="text-gray-500">Example: A fresher can ask seniors about internship prep and get guidance.</p>
            </li>
            <li>
              <strong>Random Chat –</strong> Connect with random VIT students instantly to make new friends.
              <p className="text-gray-500">Example: A first-semester student feeling lonely can find like-minded peers.</p>
            </li>
            <li>
              <strong>AI Chatbot –</strong> Get instant answers about VIT’s rules, events, and academics.
              <p className="text-gray-500">Example: "What are the re-exam rules?" The AI chatbot responds immediately.</p>
            </li>
            <li>
              <strong>Secure & Private –</strong> Only VITians can log in, and messages are not stored, ensuring privacy.
              <p className="text-gray-500">Example: Students can discuss concerns about faculty or courses without data leaks.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
