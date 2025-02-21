import Header from "@/components/Navbar/Header";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      {/* header  */}
      <Header />
      <div className="h-screen flex flex-col justify-center items-center gap-6">
        <h4 className="font-bold md:text-8xl text-4xl">404</h4>
        <h4 className="font-bold md:text-6xl text-2xl">Page Not Found</h4>
        <span className="text-zinc-500">The page you are looking for is not available</span>
        <Link
          to="/"
          className="text-xl md:text-2xl bg-blue-400/80 hover:bg-blue-400 rounded-3xl py-2 px-6 md:px-8 hover:cursor-pointer"
        >
          Back to home
        </Link>
      </div>
    </>
  );
};

export default Error;
