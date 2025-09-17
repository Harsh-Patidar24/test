import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App"; 
import Profile from "./components/ProfilePage";
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/profile/:id", 
    element: <Profile />, 
  },
]);

// Mount router
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
