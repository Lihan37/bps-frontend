import React from "react";
import { Outlet } from "react-router-dom";
import Navbar1 from "../Navbars/Navbar1";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar1></Navbar1>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
