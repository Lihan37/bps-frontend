import React from "react";
import { Outlet } from "react-router-dom";
import Navbar1 from "../Navbars/Navbar1";
import Navbar2 from "../Navbars/Navbar2";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar1></Navbar1>
        <Navbar2></Navbar2>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
