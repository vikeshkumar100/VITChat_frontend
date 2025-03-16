import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './AppRouter';
import { ThemeProvider } from "@/components/theme-provider"
createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  
);
