import React from "react";

const Login = () => {
  return (
    <div className="min-h-[600px] bg-[#3367EC] max-w-[700px] p-15 rounded-2xl mx-auto">
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-6xl text-white font-semibold font-roboto">Log In</h1>
        <p className="text-2xl text-white font-roboto">
          Fill in your email address and password to sign in.
        </p>
      </div>
      <form action="" className="flex flex-col p-6 gap-5">
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Email
          </label>
          <input type="email" className="bg-white p-3 rounded-xl" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Password
          </label>
          <input
            type="password"
            className="bg-white p-3 rounded-xl"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button
            type="button"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl ">
            Login
          </button>
        </div>
      </form>

      <p className="text-white text-center text-xl">Don't have an account? Sign Up</p>
    </div>
  );
};

export default Login;
