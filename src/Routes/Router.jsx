import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";
import MemberArea from "../Members/MemberArea";
import President from "../Notice/President";
import NoticeBoard from "../Notice/NoticeBoard";
import SignUp from "../SignUp/SignUp";
import Gallery from "../Gallery/Gallery";
import Publication from "../Notice/Publication";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'members',
            element: <MemberArea></MemberArea>
        },
        {
            path: '/president',
            element: <President></President>
        },
        {
            path: '/news',
            element: <NoticeBoard></NoticeBoard>
        },
        {
            path: '/publications',
            element: <Publication></Publication>
        },
        {
            path: '/contact',
            element: <Contact></Contact>
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
            path: '/gallery',
            element: <Gallery></Gallery>
        }

      ]
    },
  ]);