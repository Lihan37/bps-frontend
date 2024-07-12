import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Login from "../SignUp/Login";

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Helmet>
        <title>BPS - Home</title>
      </Helmet>
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4 p-2">
          <Banner />
        </div>
        <div className="w-full md:w-1/4 p-2 space-y-4">
          <Login />
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Information</h2>
            <p className="text-gray-700">
              Some additional information can go here. You can provide any
              details or notices that are relevant to the users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
