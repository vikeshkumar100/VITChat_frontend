import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import googleLogo from "../../assets/icons/google.svg";
import Header from "@/components/Navbar/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { googleauth } from "@/api/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("user") !== null
  );
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidVitEmail = (email) => {
    return email.endsWith('@vitstudent.ac.in');
  };

  const responseGoogle = async (res) => {
    try {
      if (res.code) {
        const result = await googleauth(res.code);
        const { name, email, image } = result.data.user;
        const token = result.data.token;

        if (!isValidVitEmail(email)) {
          setError("Please use your VIT student email (@vitstudent.ac.in)");
          setIsProcessing(false);
          return;
        }

        const user = { name, email, image, token };
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful! Redirecting...");
        setisAuthenticated(true);
        setError("");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Authentication failed. Please use your VIT student email.");
      setIsProcessing(false);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.log("Login Failed:", error);
      setError("Google authentication failed. Please try again.");
      setIsProcessing(false);
    },
    flow: "auth-code",
  });

  const handleLoginClick = () => {
    setIsProcessing(true);
    handleLogin();
  };

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
      />
      <ToastContainer
              position="bottom-right"
              autoClose={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
            />

      {/* Spline background */}
      <div className="h-screen w-full">
        <Spline scene="https://prod.spline.design/aBwiAk-r7oxNaFg6/scene.splinecode" />
      </div>

      {/* Login card */}
      <div className="fixed inset-0 pt-20 pb-6 px-4 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg md:max-w-2xl pointer-events-auto flex flex-col gap-5 md:gap-8 text-center bg-white/90 dark:bg-slate-900/88 border border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-5 md:py-6 md:px-12 rounded-2xl shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-slate-900 dark:text-white">Welcome to VITChat</h2>
        <div className="text-base md:text-lg text-slate-600 dark:text-slate-300">
          Exclusive to VIT students - Use your institute email
        </div>
        
        <button
          onClick={handleLoginClick}
          disabled={isProcessing}
          className={`flex flex-row items-center justify-center gap-2 p-2 md:p-3 text-sm sm:text-base md:text-xl font-semibold rounded-xl shadow-xl transition-all ${
            isProcessing 
              ? "bg-sky-400 cursor-not-allowed text-white" 
              : "bg-sky-600 hover:bg-sky-700 text-white"
          }`}
        >
          <img src={googleLogo} alt="Google Logo" className="w-8 h-8 md:w-10 md:h-10" />
          {isProcessing ? "Processing..." : "Sign in with Google"}
        </button>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm mt-2">
            ⚠️ {error}
          </div>
        )}

        <div className="text-slate-500 dark:text-slate-300 text-sm">
          Only @vitstudent.ac.in emails allowed
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;