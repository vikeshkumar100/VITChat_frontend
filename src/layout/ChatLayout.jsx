import Header from "@/components/Header/Header";
import LeftNavbar from "@/components/LeftNavbar/LeftNavbar";
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
