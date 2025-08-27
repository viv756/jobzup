import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginApiFn } from "../lib/api";
import { useAppDispatch } from "../hooks/useReducer";
import { signInSuccess } from "../redux/user/user.slice";

interface Errors {
  email?: string;
  password?: string;
}

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateForm = (): boolean => {
    let formErrors: Errors = {};
    let isValid = true;

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

    setErrors(formErrors);
    return isValid;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setErrors({});

    try {
      const data = await loginApiFn({ email, password });
      if (data) {
        dispatch(signInSuccess(data.user));
        toast.success(data.message);
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="min-h-[600px] bg-[#3367EC] max-w-[700px] p-15 rounded-2xl mx-auto">
        <div className="flex items-center flex-col gap-4">
          <h1 className="text-6xl text-white font-semibold font-roboto">Log In</h1>
          <p className="text-2xl text-white font-roboto">
            Fill in your email address and password to sign in.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col p-6 gap-5">
          <div className="flex flex-col">
            <label htmlFor="" className="font-roboto text-white">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-3 rounded-xl"
              placeholder="Enter your password"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.password}</p>
          </div>

          <div>
            <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl ">
              Login
            </button>
          </div>
        </form>

        <p className="text-white text-center text-xl">
          Don't have an account?
          <Link to={"/sign-up"} className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
