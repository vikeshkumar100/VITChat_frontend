import React from "react";
import { Navigate } from "react-router-dom";
import { isSessionValid, logoutUser } from "@/lib/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = isSessionValid();

  if (!isAuthenticated) {
    logoutUser({ redirectTo: "/login" });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
