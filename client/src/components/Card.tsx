import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const Card = () => {
  return (
    <div className=" max-w-[450px] overflow-hidden rounded-xl bg-gray3 hover:bg-white shadow p-6 border border-secondary2">
      <div className="flex items-center gap-3">
        <img src="/c_logo1.svg" className="w-15" />
        <h1 className="text-[26px] font-roboto font-semibold">Swift works Inc</h1>
      </div>
      <div className=" flex flex-col gap-3 mt-7">
        <h3 className="text-xl text-gray-900 font-semibold">Customer service representitive</h3>
        <p className="mt-1 text-gray-500 text-[17px]">
          Access stunning website templates and full-stack projects crafted for developers and
          startups. Start building today with TemplateSee!
        </p>
        <div className="mt-2 flex gap-4">
          <span className="inline-flex gap-1 items-center text-center">
            <CiLocationOn className="text-blue-700" size={20} /> Amsterdam,Holland{" "}
          </span>
          <span className="inline-flex items-center gap-1 text-center  ">
            <IoTimeOutline className="text-blue-700" />
            Full-Time
          </span>
        </div>

        <button className="btn rounded-3xl text-lg bg-black text-white p-6 w-48 hover:bg-primary mt-5">
          View details
        </button>
      </div>
    </div>
  );
};

export default Card;
