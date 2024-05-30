import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyAlbum } from "./views/MyAlbum.tsx";
import { GetLamites } from "./views/GetLamites.tsx";

const router = createBrowserRouter([
  {
    path: "/star-wars/",
    element: <App />,
    children: [
      {
        path: "/star-wars/",
        element: <MyAlbum />,
      },
      {
        path: "/star-wars/getLaminates",
        element: <GetLamites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
