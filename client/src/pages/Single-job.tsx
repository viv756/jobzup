import React from "react";

import { CalendarPlus2 } from "lucide-react";
import { CalendarX } from "lucide-react";

const SingleJob = () => {
  return (
    <div className="sm:px-15">
      {/* Header */}
      <div className="bg-[#2453CC] flex rounded-2xl min-h-[180px] items-center p-5 pl-13 gap-7">
        <div className="bg-white rounded-full p-3">
          <img src="c_logo1.svg" alt="" className="w-18" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-roboto font-semibold ">
            Customer service representative
          </h1>
          <div className="text-white flex gap-6 text-md ">
            <span className="text-white">Amsterdam, Holland</span> <span>UI/UX design</span>{" "}
            <span>Full-Time</span>
          </div>
        </div>
      </div>

      <div className="mt-20 sm:flex gap-30">
        <div>
          <h2 className="text-3xl font-semibold font-roboto text-gray-800">Job description</h2>
          <hr className="border border-gray-300 mt-5" />
          <p className="text-lg mt-6">
            We're seeking a talented React Native Front End Developer to join our growing team and
            contribute to the development of cutting-edge mobile applications. Google is an
            equal-opportunity employer. We encourage candidates from all backgrounds to apply.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
              <CalendarPlus2 className="" color="#2453CC" />
              <p className="text-gray1 text-lg font-roboto">Date Posted</p>
              <p className="text-gray-600 font-semibold text-xl font-roboto">February 9, 2024</p>
            </div>
            <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
              <CalendarPlus2 className="" />
              <p className="text-gray1 text-lg font-roboto">Date Posted</p>
              <p className="text-gray-600 font-semibold text-xl font-roboto">February 9, 2024</p>
            </div>
            <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
              <CalendarPlus2 className="" />
              <p className="text-gray1 text-lg font-roboto">Date Posted</p>
              <p className="text-gray-600 font-semibold text-xl font-roboto">February 9, 2024</p>
            </div>
            <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
              <CalendarPlus2 className="" />
              <p className="text-gray1 text-lg font-roboto">Date Posted</p>
              <p className="text-gray-600 font-semibold text-xl font-roboto">February 9, 2024</p>
            </div>
            <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
              <CalendarPlus2 className="" />
              <p className="text-gray1 text-lg font-roboto">Date Posted</p>
              <p className="text-gray-600 font-semibold text-xl font-roboto">February 9, 2024</p>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-gray-800 text-3xl font-roboto font-semibold ">Responsibilities</h1>
            <hr className="border border-gray-300 mt-5" />
            <p className="mt-6 text-xl text-gray-800 ">
              Google is an equal-opportunity employer. We encourage candidates from all backgrounds
              to apply. How promotion excellent curiosity yet attempted happiness Gay prosperous
              impression had conviction For every delay.
            </p>

            <ul className="mt-5">
              <li className="text-xl">
                Develop high-quality and performant mobile applications using React Native.
              </li>
              <li>
                Collaborate with cross-functional teams, including designers and backend developers,
                to implement user-friendly features.
              </li>
              <li>
                Create visually appealing and responsive user interfaces that provide a seamless and
                enjoyable user experience.
              </li>
            </ul>

            <h1 className="text-gray-800 text-3xl font-roboto font-semibold mt-8">
              Job Requirements
            </h1>
            <hr className="border border-gray-300 mt-5" />

            <ul className="mt-5">
              <li className="text-xl">
                3+ years of professional experience in React Native mobile app development.
              </li>
              <li>Proficient in React Native, JavaScript, and related technologies.</li>
              <li>
                Experience with state management libraries (e.g., Redux) and asynchronous
                programming.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-black min-w-md rounded-2xl min-h-50 flex flex-col justify-center p-10 gap-8">
            <h3 className="text-white text-2xl font-roboto font-semibold">
              Interested in this job?
            </h3>
            <button className="bg-[#2453CC] p-3 rounded-3xl text-md font-roboto text-white w-40 hover:bg-blue-900 transition duration-200 ">Apply now</button>
          </div>

      
            <div className="p-10 shadow-xl rounded-2xl mt-10 w-120 bg-white">
              <div className="flex items-center gap-5">
                <img src="c_logo1.svg" alt="" className="w-20" />
                <div className="flex flex-col ">
                  <h1 className="text-2xl font-semibold font-roboto">Swift works Inc</h1>
                  <p className="text-gray-500">Amsterdam, Holland</p>
                </div>
              </div>

              <p className="mt-5 text-lg text-gray-500 font-roboto">
                Unlock cross-platform brilliance with our React Native front-end development.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5 ">
                <p className="text-lg">Company size</p>
                <p className="text-lg"> 5 - 12</p>
                <p className="text-lg">Founded in</p>
                <p className="text-lg">2020</p>
                <p className="text-lg">Phone</p>
                <p className="text-lg">+44 (0) 161808123</p>
                <p className="text-lg">Email</p>
                <p className="text-lg ">http://example@gmail.com</p>
              </div>

              <button className="p-3 text-[18px] font-roboto bg-black text-white w-full mt-8  rounded-3xl hover:bg-blue-800 transition duration-300">
                View Company
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
