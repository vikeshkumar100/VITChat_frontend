import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './layout'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Contact from "./pages/Contact/Contact"

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  ),
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
