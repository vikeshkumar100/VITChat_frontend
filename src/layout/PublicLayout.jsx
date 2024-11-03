import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
const PublicLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = true;  //logic for checking if user is authenticated

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home page if authenticated
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
        <Outlet />
        <Footer />
    </>
  );
};

export default PublicLayout;
