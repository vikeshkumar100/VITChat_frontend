import React from "react";
import { Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import googleLogo from "../../assets/icons/google.svg";

const Login = () => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleLogin = () => {
    console.log("Login with google");
  };
  return (
    <>
      <div className="text-white fixed top-0 w-full text-3xl bg-black/50 text-center p-2 border-b-2 border-gray-600">
        VITCHAT
      </div>
      <div className="h-screen w-full">
        <Spline scene="https://prod.spline.design/aBwiAk-r7oxNaFg6/scene.splinecode" />
      </div>
      <div className="w-[80vw] md:w-[50vw] flex flex-col gap-8 text-center fixed top-[40vh] left-[50vw] bg-slate-800 px-8 py-4 md:py-8 md:px-16 rounded-xl transform -translate-x-1/2 -translate-y-1/2 ">
        <h2 className="text-3xl md:text-5xl text-white">Welcome to VITChat</h2>
        <div className="text-lg text-gray-400">
          Sign in with your VIT email to continue
        </div>
        <button
          onClick={handleLogin}
          className="flex flex-row items-center justify-center gap-2 bg-blue-500  p-3 text-xl font-semibold rounded-xl shadow-xl hover:shadow-blue-900"
        >
          <span>
            <img src={googleLogo} alt="Google Logo" className="w-10 h-10" />
          </span>
          Sign in with google
        </button>
      </div>
    </>
  );
};

export default Login;
