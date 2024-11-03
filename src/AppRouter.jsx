import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import PrivateLayout from "./layout/PrivateLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import GlobalChat from "./pages/GlobalChat/GlobalChat";
import Landing from "./pages/Landing/Landing";
import PublicLayout from "./layout/PublicLayout";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* public routes  */}
      <Route path="landing" element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* private routes  */}
      <Route path="/" element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="global-chat" element={<GlobalChat />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </>
  )
);

export default Router;
