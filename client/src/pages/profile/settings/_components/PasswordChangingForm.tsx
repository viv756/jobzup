import React, { useState } from "react";
import toast from "react-hot-toast";

import { userSettingsPasswordChangeApiFn } from "../../../../lib/api";

interface Errors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  checkPassword?: string;
}

const PasswordChangingForm = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    let formErrors: Errors = {};
    let isValid = true;

    if (!currentPassword) {
      isValid = false;
      formErrors.currentPassword = "Enter your password";
    }

    if (!newPassword) {
      isValid = false;
      formErrors.newPassword = "Password is required";
    }

    if (!confirmPassword) {
      isValid = false;
      formErrors.confirmPassword = "Re enter your password";
    }

    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
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

    setErrors({});
    setLoading(true);

    try {
      const data = await userSettingsPasswordChangeApiFn({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (data) {
        toast.success(data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <form action="" className=" mt-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              Current password
            </label>
            <input
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter current password"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.currentPassword}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              New password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter new password"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.newPassword}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              Confirm new password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter confirm password"
            />
            <p className="pl-2 mt-1 text-red-600">{errors && errors.confirmPassword}</p>
            <p className="pl-2 mt-1 text-red-600">{errors && errors.checkPassword}</p>
          </div>
        </div>

        <button
          disabled={loading}
          className="rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800  focus:bg-blue-800  w-32 disabled:bg-blue-900">
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save changes"}
        </button>
      </form>
    </>
  );
};

export default PasswordChangingForm;
