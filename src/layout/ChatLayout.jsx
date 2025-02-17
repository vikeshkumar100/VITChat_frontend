import LeftNavbar from "@/components/LeftNavbar/LeftNavbar";
import React from "react";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <>
      <LeftNavbar />
      <Outlet />
    </>
  );
};

export default ChatLayout;
