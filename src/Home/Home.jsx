import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Login from "../SignUp/Login";
import Notice from "../Notice/Notice";
import Honorable from "../Honor/Honorable";
import Banner2 from "../Banner/Banner2";
import Members from "../Members/Members";

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Helmet>
        <title>BPS - Home</title>
      </Helmet>
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4 p-2">
          <Banner />
          <Honorable />
        </div>
        <div className="w-full md:w-1/4 p-2 space-y-4">
          <Login />
          <Notice />
        </div>
      </div>
      <div>
        <Banner2></Banner2>
      </div>
      <div>
        <Members></Members>
      </div>
    </div>
  );
};

export default Home;
