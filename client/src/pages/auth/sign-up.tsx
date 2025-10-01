import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerApiFn } from "../../lib/api";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  checkPassword?: string;
}

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<"job_seeker" | "recruiter">("job_seeker");

  const [errors, setErrors] = useState<Errors>({});

  const navigateTo = useNavigate();

  const validateForm = (): boolean => {
    let formErrors: Errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      formErrors.name = "Name is required";
    }

    if (!email) {
      isValid = false;
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      formErrors.password = "password is required";
    }

    if (!confirmPassword) {
      isValid = false;
      formErrors.confirmPassword = "Re enter your password";
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        isValid = false;
        formErrors.checkPassword = "Passwords do not match";
      }
    }

    setErrors(formErrors);
    return isValid;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check that all fields are entered
    if (!validateForm()) {
      return;
    }

    // clear all errors
    setErrors({});

    try {
      const data = await registerApiFn({ name, email, password, confirmPassword, role });
      if (data) {
        toast.success(data.message);
        navigateTo("/sign-in");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[600px] shadow-xl  max-w-[650px] p-15 rounded-2xl mx-auto">
      <div className=" space-y-2">
        <h1 className="text-4xl font-semibold font-dm">Sign Up</h1>
        <p className="text-xl  font-dm">
          or already have an account?{" "}
          <Link to={"/sign-in"} className="text-blue-600">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col p-6 gap-5">
        <div className="flex flex-col gap-1">
          <p className="font-dm text-md font-medium ">Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            name="name"
            className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
          />
          <p className="pl-2 mt-1 text-red-600">{errors && errors.name}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-dm text-md font-medium ">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
            placeholder="Enter your email"
          />
          <p className="pl-2 mt-1 text-red-600">{errors && errors.email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-dm text-md font-medium ">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
            placeholder="Enter your password"
          />
          <p className="px-2 mt-1 text-red-600">{errors && errors.password}</p>
          <p className="px-2 mt-1 text-red-600">{errors && errors.checkPassword}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-dm text-md font-medium ">Compare password</p>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
            className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
            placeholder="Re enter your password"
          />
          <p className="px-2 mt-1 text-red-600">{errors && errors.password}</p>
          <p className="px-2 mt-1 text-red-600">{errors && errors.checkPassword}</p>
        </div>

        <div className="flex justify-center gap-10 ">
          <div className="flex gap-3 items-center">
            <p className="font-dm text-md font-medium ">JOB SEEKER</p>
            <input
              onChange={(e) => setRole(e.target.value as "job_seeker" | "recruiter")}
              checked={role === "job_seeker"}
              type="radio"
              value="job_seeker"
              name="role"
              className="radio radio-info"
            />
          </div>
          <div className="flex gap-3 items-center">
            <p className="font-dm text-md font-medium ">RECRUITER</p>
            <input
              onChange={(e) => setRole(e.target.value as "job_seeker" | "recruiter")}
              value="recruiter"
              checked={role === "recruiter"}
              type="radio"
              name="role"
              className="radio radio-info"
            />
          </div>
        </div>
        <div>
          <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-dm px-5 py-2.5 text-center me-2 mb-2 text-xl ">
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
