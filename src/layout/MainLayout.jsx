import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LeftNavbar from "@/components/LeftNavbar/LeftNavbar";
const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex flex-row relative">
        <LeftNavbar />
        <div className="min-h-screen pt-[10vh] md:pt-[6vh] md:pl-28">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
