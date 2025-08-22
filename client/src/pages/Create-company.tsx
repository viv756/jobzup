import React from "react";

const CreateCompany = () => {
  return (
    <div>
      <form action="">
        <p className=" text-2xl text-black font-semibold font-roboto mt-10">Company Details</p>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Company Name
        </label>
        <input
          type="text"
          className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
        />

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Company Email
            </label>
            <input
              type="email"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Company Location
            </label>
            <input
              type="text"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <label htmlFor="" className="text-[18px] text-gray-400">
          Company Description
        </label>
        <textarea
          name=""
          id=""
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>
      </form>
    </div>
  );
};

export default CreateCompany;
