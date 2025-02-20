import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import googleLogo from "../../assets/icons/google.svg";
import Header from "@/components/Navbar/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { googleauth } from "@/api/login";

const Login = () => {
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("user") !== null
  );

  const responseGoogle = async (res) => {
    try {
      if (res.code) {
        const result = await googleauth(res.code);
        const { name, email, image } = result.data.user;
        const token = result.data.token;

        const user = { name, email, image, token };
        localStorage.setItem("user", JSON.stringify(user));
        console.log(name, email, image);
        setisAuthenticated(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return (
    <>
      {/* header  */}
      <Header />

      {/* spline background*/}
      <div className="h-screen w-full">
        <Spline scene="https://prod.spline.design/aBwiAk-r7oxNaFg6/scene.splinecode" />
      </div>

      {/* login card  */}
      <div className="w-[80vw] md:w-[50vw] flex flex-col gap-8 text-center fixed top-[40vh] left-[50vw] bg-slate-800 px-8 py-4 md:py-8 md:px-16 rounded-xl transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl md:text-5xl text-white">Welcome to VITChat</h2>
        <div className="text-lg text-gray-400">
          Sign in with your VIT email to continue
        </div>
        <button
          onClick={handleLogin}
          className="flex flex-row items-center justify-center gap-2 bg-blue-500  p-1 md:p-3 text-base md:text-xl font-semibold rounded-xl shadow-xl hover:shadow-blue-900"
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
