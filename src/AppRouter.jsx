import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import GlobalChat from "./pages/GlobalChat/GlobalChat";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import ChatBot from "./pages/Chatbot/Chatbot";
import Error from "./pages/Error/Error";
import ChatLayout from "./layout/ChatLayout";
import RandomChat from "./pages/RandomChat/RandomChat";
import ChatHome from "./pages/ChatHome/ChatHome";

import { GoogleOAuthProvider } from "@react-oauth/google";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const GoogleAuthWrapper=()=>{
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Login />
    </GoogleOAuthProvider>
  )
};
      
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* public routes  */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      
      {/* protected routes */}
      <Route path="chat" element={<ProtectedRoute><ChatLayout /></ProtectedRoute>}>
        <Route index element={<ChatHome />} />
        <Route path="global-chat" element={<GlobalChat />} />
        <Route path="chat-bot" element={<ChatBot />} />
        <Route path="random-chat" element={<RandomChat />} />    
      </Route>

      {/* login route  */}
      <Route path="login" element={<GoogleAuthWrapper />} />
      <Route path="*" element={<Error />} />

    </>
  )
);

export default Router;
