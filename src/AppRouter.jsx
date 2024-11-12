import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import GlobalChat from "./pages/GlobalChat/GlobalChat";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import ChatBot from "./pages/Chatbot/Chatbot";
import Error from "./pages/Error/Error";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        {/* public routes  */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="chat-bot" element={<ChatBot />} />

        {/* private routes  */}
        <Route path="global-chat" element={<ProtectedRoute><GlobalChat /></ProtectedRoute>} />
        <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Route>

      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<Error/>} />
    </>
  )
);

export default Router;
