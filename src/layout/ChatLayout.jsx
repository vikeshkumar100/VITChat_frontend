import Header from "@/components/Navbar/Header";
import LeftNavbar from "@/components/Navbar/LeftNavbar";
import React from "react";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <>
      {/* header  */}
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen md:h-screen">
        <LeftNavbar />
        <main className="w-full md:flex-1 min-h-0">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ChatLayout;
