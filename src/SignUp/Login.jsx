import React from "react";

const Login = () => {
  return (
    <div
      className="bg-[#006382] shadow-lg rounded-3xl p-6"
      style={{
        boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
      }}
    >
      <h2 className="text-xl text-white ml-2 font-bold mb-4">Login</h2>
      <form>
        <div className="mb-4">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center mb-4 justify-between">
          <button
            className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center mb-2 justify-between">
          <button
            className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            Apply for new membership
          </button>
        </div>
        <div className="flex items-center mb-2 justify-between">
          <button
            className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            Renew Your Membership
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
