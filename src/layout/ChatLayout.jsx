import Header from "@/components/Navbar/Header";
import LeftNavbar from "@/components/Navbar/LeftNavbar";
import React from "react";
import {Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <>
      {/* header  */}
      <Header />
      <LeftNavbar />
      <Outlet />
    </>
  );
};

export default ChatLayout;
