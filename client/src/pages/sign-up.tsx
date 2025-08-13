import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  comparePassword: string;
  role: "freelancer" | "employer";
}

const SignUp = () => {
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    comparePassword: "",
    role: "freelancer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  return (
    <div className="min-h-[600px] bg-[#3367EC] max-w-[650px] p-15 rounded-2xl mx-auto">
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-6xl text-white font-semibold font-roboto">Sign Up</h1>
        <p className="text-2xl text-white font-roboto">Create an account and start using Jobzup.</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col p-6 gap-5">
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
            name="userName"
            className="bg-white p-3 rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="bg-white p-3 rounded-xl"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="bg-white p-3 rounded-xl"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Compare password
          </label>
          <input
            onChange={handleChange}
            name="confirmPassword"
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
            <input
              onChange={handleChange}
              checked={formData.role === "freelancer"}
              type="radio"
              name="role"
              className="radio radio-info"
              defaultChecked
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="text-white text-xl">
              Employer
            </label>
            <input
              onChange={handleChange}
              checked={formData.role === "employer"}
              type="radio"
              name="role"
              className="radio radio-info"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl ">
            Create an account
          </button>
        </div>
      </form>

      <p className="text-white text-center text-xl">Have an account? login</p>
    </div>
  );
};

export default SignUp;
