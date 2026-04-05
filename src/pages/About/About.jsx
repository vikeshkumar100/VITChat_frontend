import React from "react";
import WhySection from "../../components/Sections/WhySection";
import Iphone15Pro from "../../components/magicui/iphone-15-pro";
import chatpage from "../../assets/images/chatbot.jpg";
import Boxreveal from "../../components/Sections/Boxreveal";
import { MessagesSquare, ShieldCheck, Sparkles, Users } from "lucide-react";

const highlights = [
  {
    title: "Student-first community",
    description: "Built to help VIT students ask questions, share updates, and help each other faster.",
    Icon: Users,
  },
  {
    title: "Fast conversations",
    description: "Global chat and random chat make discovery and interaction feel instant and engaging.",
    Icon: MessagesSquare,
  },
  {
    title: "Safe campus space",
    description: "Access is restricted to verified student email identities for a more trusted environment.",
    Icon: ShieldCheck,
  },
  {
    title: "Always improving",
    description: "VITChat evolves with student feedback and new features each iteration.",
    Icon: Sparkles,
  },
];

const About = () => {
  return (
    <div className="relative w-full min-h-screen px-4 md:px-8 lg:px-20 pt-16 pb-14 overflow-x-hidden">

      {/* gradient bg  */}
      <div className="absolute z-[-1] top-8 -left-10 md:w-72 w-44 md:h-72 h-44 bg-sky-400/30 rounded-full blur-[120px] dark:opacity-50"></div>
      <div className="absolute z-[-1] top-1/3 -right-10 md:w-96 w-52 md:h-96 h-52 bg-cyan-300/25 rounded-full blur-[140px] dark:opacity-40"></div>
      
      {/* hero section  */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row gap-10 lg:gap-12 justify-between items-center py-8">
        <div className="h-full max-w-xl">
          <p className="inline-flex items-center rounded-full border border-sky-200 dark:border-slate-700 bg-white/75 dark:bg-slate-900/60 px-4 py-1 text-xs tracking-[0.18em] uppercase text-sky-700 dark:text-sky-300 mb-4">
            About VITChat
          </p>
          <Boxreveal />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/55 backdrop-blur p-4 shadow-sm"
              >
                <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-sky-300/30 to-cyan-300/20 dark:from-sky-500/20 dark:to-cyan-400/10 blur-2xl rounded-[3rem]" />
          <div className="relative rounded-[2.5rem] border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-2 pt-6 pb-2 shadow-xl">
            <Iphone15Pro className="h-[560px] md:h-[620px]" src={chatpage} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/75 dark:bg-slate-900/55 p-5">
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">01</p>
          <p className="mt-1 font-semibold">Global discussion hub</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">One place for placement prep, academics, events, and opportunities.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/75 dark:bg-slate-900/55 p-5">
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">02</p>
          <p className="mt-1 font-semibold">Meaningful peer discovery</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Connect with random VIT students to collaborate, learn, and network.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/75 dark:bg-slate-900/55 p-5">
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">03</p>
          <p className="mt-1 font-semibold">Student-built AI support</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Quick answers and guidance for common student queries and workflows.</p>
        </div>
      </div>

      {/* why section  */}
      <WhySection />
    </div>
  );
};

export default About;
