import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerApiFn } from "../lib/api";

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
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");

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
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            name="name"
            className="bg-white p-3 rounded-xl"
          />
          <p className="pl-2 mt-1 text-red-600">{errors && errors.name}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="bg-white p-3 rounded-xl"
            placeholder="Enter your email"
          />
          <p className="pl-2 mt-1 text-red-600">{errors && errors.email}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="bg-white p-3 rounded-xl"
            placeholder="Enter your password"
          />
          <p className="px-2 mt-1 text-red-600">{errors && errors.password}</p>
          <p className="px-2 mt-1 text-red-600">{errors && errors.checkPassword}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-roboto text-white">
            Compare password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
            className="bg-white p-3 rounded-xl"
            placeholder="Re enter your password"
          />
          <p className="px-2 mt-1 text-red-600">{errors && errors.password}</p>
          <p className="px-2 mt-1 text-red-600">{errors && errors.checkPassword}</p>
        </div>

        <div className="flex justify-center gap-10 ">
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="text-white text-xl">
              Candidate
            </label>
            <input
              onChange={(e) => setRole(e.target.value as "candidate" | "recruiter")}
              checked={role === "candidate"}
              type="radio"
              value="candidate"
              name="role"
              className="radio radio-info"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="text-white text-xl">
              Recruiter
            </label>
            <input
              onChange={(e) => setRole(e.target.value as "candidate" | "recruiter")}
              value="recruiter"
              checked={role === "recruiter"}
              type="radio"
              name="role"
              className="radio radio-info"
            />
          </div>
        </div>
        <div>
          <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl ">
            Create an account
          </button>
        </div>
      </form>

      <p className="text-white text-center text-xl">
        Have an account?
        <Link to={"/sign-in"} className="underline">
          {" "}
          login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
