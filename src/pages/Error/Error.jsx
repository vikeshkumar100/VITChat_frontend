import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="w-full bg-red-400 text-2xl text-center">VITCHAT</div>
      <div className="h-screen flex flex-col justify-center items-center gap-6 bg-black text-white">
        <h4 className="font-bold text-9xl">404 Not Found</h4>
        <Link
          to="/"
          className="text-2xl bg-blue-400 rounded-3xl py-2 px-6 hover:cursor-pointer"
        >
          Back to home
        </Link>
      </div>
    </>
  );
};

export default Error;
