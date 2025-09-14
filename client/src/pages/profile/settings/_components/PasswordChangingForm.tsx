import React from "react";

const PasswordChangingForm = () => {
  return (
    <>
      <form action="" className=" mt-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              Current password
            </label>
            <input
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter current password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              New password
            </label>
            <input
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-md font-dm">
              Confirm new password
            </label>
            <input
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              placeholder="Enter confirm password"
            />
          </div>
        </div>

        <button className="rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 mt-6">
          Save changes
        </button>
      </form>
    </>
  );
};

export default PasswordChangingForm;
