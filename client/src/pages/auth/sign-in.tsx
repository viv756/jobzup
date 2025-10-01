import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch } from "../../hooks/useReducer";
import { loginApiFn } from "../../lib/api";
import { signInSuccess } from "../../redux/user/user.slice";

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
      }

      if (data.user.role === "JOB_SEEKER" && data.user.profile === null) {
        navigate(`/create/profile`);
      } else if (data.user.role === "RECRUITER" && data.user.company === null) {
        navigate(`/create/company`);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="min-h-[500px] shadow-xl max-w-[700px] p-15 rounded-2xl mx-auto mt-20">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold font-dm ">Sign in</h1>
          <p className="text-xl  font-dm">
            or don’t have an account?{" "}
            <Link to={"/sign-up"} className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col p-6 gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-dm text-md font-medium ">Account or Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
              placeholder="Enter your email"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-dm text-md font-medium ">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-3 outline-none border rounded-sm focus:border-blue-600 border-gray-400"
              placeholder="Enter your password"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.password}</p>
          </div>

          <div>
            <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-dm px-5 py-2.5 text-center me-2 mb-2 text-xl ">
              Login
            </button>
          </div>
        </form>

        <p className="text-white text-center text-xl">
          Don't have an account?
          <Link to={"/sign-up"} className="underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
