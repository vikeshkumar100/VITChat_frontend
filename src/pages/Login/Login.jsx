import React from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="w-full bg-red-400 text-2xl text-center">VITCHAT</div>
      <div>Login</div>
    </>
  );
};

export default Login;
