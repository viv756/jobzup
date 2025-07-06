import React from "react";

const Signin = () => {
  return (
    <div className="min-h-[600px] bg-[#3367EC] max-w-[700px] p-15 rounded-2xl mx-auto">
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-6xl text-white font-semibold font-roboto">Sign Up</h1>
        <p className="text-2xl text-white font-roboto">Create an account and start using Jobzup.</p>
      </div>
      <form action="" className="flex flex-col p-6 gap-5">
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Name
          </label>
          <input type="text" placeholder="Enter your name" className="bg-white p-3 rounded-xl" />
        </div>
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
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Compare password
          </label>
          <input
            type="password"
            className="bg-white p-3 rounded-xl"
            placeholder="Re enter your password"
          />
        </div>

        <div className="flex justify-center gap-10 ">
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="text-white text-xl">
              Freelancer
            </label>
            <input type="radio" name="radio-9" className="radio radio-info" defaultChecked />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="text-white text-xl">
              Employer
            </label>
            <input type="radio" name="radio-9" className="radio radio-info" />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl ">
            Create an account
          </button>
        </div>
      </form>

      <p className="text-white text-center text-xl">Have an account? login</p>
    </div>
  );
};

export default Signin;
