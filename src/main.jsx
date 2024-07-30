import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Router.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="mx-auto">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
