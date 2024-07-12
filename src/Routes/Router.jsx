import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Home/Home";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
      ]
    },
  ]);