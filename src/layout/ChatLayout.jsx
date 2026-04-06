import Header from "@/components/Navbar/Header";
import LeftNavbar from "@/components/Navbar/LeftNavbar";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connectSocket } from "@/lib/socket";

const ChatLayout = () => {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      {/* header  */}
      <Header />
      <div className="flex flex-col md:flex-row min-h-[100dvh] md:h-[100dvh] overflow-hidden">
        <LeftNavbar />
        <main className="w-full md:flex-1 min-h-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ChatLayout;
