import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Main from "../Layouts/Main";
  import Home from "../Home/Home";
  import Contact from "../Contact/Contact";
  import MemberArea from "../Members/MemberArea";
  import NoticeBoard from "../Notice/NoticeBoard";
  import SignUp from "../SignUp/SignUp";
  import Gallery from "../Gallery/Gallery";
  import Publication from "../Notice/Publication";
  import Users from "../Members/Users";
import Profile from "../SignUp/Profile";
import Honorary from "../Members/Honorary";
import SCmembers from "../Members/SCmembers";
import Mission from "../Notice/Mission";
import ECmembers from "../Members/ECmembers";
import AdminUserProfile from "../Members/AdminUserProfile";
  
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
        },
        {
          path: '/users',
          element: <Users></Users>
        },
        {
          path: '/profile', 
          element: <Profile></Profile>
        },
        {
          path: '/honorary', 
          element: <Honorary></Honorary>
        },
        {
          path: '/sc-members', 
          element: <SCmembers></SCmembers>
        },
        {
          path: '/ec-members', 
          element: <ECmembers></ECmembers>
        },
        {
          path: '/mission', 
          element: <Mission></Mission>
        },
        {
          path: '/user/profile/:email',
          element: <AdminUserProfile />,
        }
        
        
      ]
    },
  ]);
  