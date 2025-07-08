import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { Globe } from "lucide-react";
import { MapPin } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="sm:px-15">
      <div className="flex sm:flex-row flex-col mt-16 gap-8 mx-20 ">
        <div className="border border-gray-300 rounded-2xl p-7">
          <div className="flex flex-col items-center gap-5 ">
            <div className="rounded-full">
              <img src="/freelnce-2.jpg" alt="" className="w-30 rounded-full " />
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="text-xl font-semibold ">Jen Jav</p>
              <p className="text-gray-700">Ux Ui design</p>
              <p className="p-1 px-5 bg-gray-200 rounded-3xl font-semibold">100/month</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-gray-800 flex items-center gap-2 text-md ">
              <MapPin className="" color="#050100" size={20} /> Los Angeles
            </p>
            <p className="text-gray-800 flex items-center gap-2 text-md">
              <Globe color="#050100" size={20} /> Deutsh
            </p>

            <button className="bg-blue-700 text-white p-3 rounded-xl w-full mt-4">
              Send Message
            </button>

            <h3 className="text-lg font-semibold font-roboto text-gray-950 mt-5">Skills</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              <p className="p-1 px-3 bg-gray-200 rounded-3xl">Content Editor</p>
              <p className="p-1 px-3 bg-gray-200 rounded-3xl">Developer</p>
            </div>

            <h3 className="text-lg font-semibold font-roboto text-gray-950 mt-6">Insights</h3>
            <div className="grid grid-cols-2 mt-3  gap-3">
              <p className="text-gray-950">All time Earnings</p>
              <p className="text-black place-self-end font-semibold">$6,612</p>
              <p>Services Completed</p>
              <p className="place-self-end font-semibold">0</p>
              <p>Member Since</p>
              <p className="place-self-end font-semibold ">Jul 2024</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl text-center font-roboto ">About Me</h1>
          <hr className="border border-gray-400 mt-3" />

          <div className="grid grid-cols-4 gap-1 mt-5">
            <div>
              <p className="text-lg text-gray-950">Experience time</p>
              <span>1 – 2 Years</span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Qualification</p>
              <span>Associate Degree</span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Gender</p>
              <span>Male</span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Age</p>
              <span>25 – 30</span>
            </div>
          </div>

          <p className="mt-7 text-gray-700 font-roboto">
            Detail oriented work is a must in my book and you will get a high-quality product from
            me. Please invite me to discuss how my skills fit your posting, how I can address your
            expected and unexpected needs, and to negotiate my rate. You will be pleased with a fast
            turn-around of quality work. For over 20 years I have served as a peer-reviewer focusing
            on writing and APA formatting for a national journal. Because of this, my proofreading
            skills are very honed causing errors to practically jump off the page. I have a recently
            completed letter of recommendation from a journal editor filed here.
          </p>

          <h1 className="text-xl mt-6 font-semibold font-roboto">Work Experience</h1>
 
        
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
