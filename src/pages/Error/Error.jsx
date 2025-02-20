import Header from "@/components/Navbar/Header";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      {/* header  */}
      <Header />
      <div className="h-screen flex flex-col justify-center items-center gap-6">
        <h4 className="font-bold text-8xl">404 Not Found</h4>
        <Link
          to="/"
          className="text-2xl bg-blue-400/80 hover:bg-blue-400 rounded-3xl py-2 px-8 hover:cursor-pointer"
        >
          Back to home
        </Link>
      </div>
    </>
  );
};

export default Error;
