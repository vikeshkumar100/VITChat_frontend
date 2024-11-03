import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PrivateLayout = () => {
  const navigate=useNavigate();
  const isAuthenticated = true; //logic for checking if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/landing"); // Redirect to landing page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
