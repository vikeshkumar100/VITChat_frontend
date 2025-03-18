import React from "react";
import WhySection from "../../components/Sections/WhySection";
import Iphone15Pro from "../../components/magicui/iphone-15-pro";
import chatpage from "../../assets/images/chatbot.jpg";
import Boxreveal from "../../components/Sections/Boxreveal";
const About = () => {
  return (
    <div className="w-full min-h-screen lg:px-24 pt-12">

      {/* gradient bg  */}
      <div className="absolute z-[-100] top-10 left-0 md:w-72 w-0 md:h-72 h-0 bg-blue-500 rounded-full blur-[120px] dark:opacity-60"></div>
      
      {/* hero section  */}
      <div className="w-full min-h-screen flex flex-col md:flex-row gap-10 justify-evenly items-center">
        <div className="h-full">
          <Boxreveal />
        </div>
        <div>
          <Iphone15Pro className="h-[620px]" src={chatpage} />
        </div>
      </div>

      {/* why section  */}
      <WhySection />
    </div>
  );
};

export default About;
