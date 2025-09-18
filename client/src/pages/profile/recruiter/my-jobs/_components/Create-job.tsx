import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import {
  JobCategories,
  type JobCategoriesType,
  type JobTypeEnumType,
} from "../../../../../constant";
import { createJobApiFn } from "../../../../../lib/api";
import type { CreateJobPayloadType } from "../../../../../types/api.type";
import "react-datepicker/dist/react-datepicker.css";

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [hiringLocation, setHiringLocation] = useState<string>("");
  const [jobType, setJobType] = useState<JobTypeEnumType | string>("");
  const [salary, setSalary] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [jobQualification, setJobQualification] = useState<string>("");
  const [jobCategory, setJobCategory] = useState<JobCategoriesType | string>("");
  const [description, setDescription] = useState<string>("");
  const [responsibilities, setResponsibilities] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [closingDate, setClosingDate] = useState<Date | null>(new Date());

  const [createStart, setCreateStart] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateStart(true);

    const responsibilitiesArray = responsibilities
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const requirementsArray = requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload: CreateJobPayloadType = {
      title: jobTitle,
      location: hiringLocation,
      category: jobCategory,
      description: description,
      jobType: jobType,
      closeDate: closingDate,
      qualification: jobQualification,
      hiringLocation: hiringLocation,
      experience: experience,
      salary: salary,
      responsibilities: responsibilitiesArray,
      requirements: requirementsArray,
    };

    try {
      const data = await createJobApiFn(payload);
      if (data) {
        toast.success(data.message);
        setCreateStart(false);
        navigate(`/job/${data.job._id}`);
      }
    } catch (error: any) {
      setCreateStart(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="bg-white   p-10 mx-auto rounded-2xl ">
        <h1 className="text-4xl  font-semibold font-satoshi ">Update Job Details</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-7">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[18px]  font-dm">
              Job Title
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[18px]  font-dm">
              Location
            </label>
            <input
              value={hiringLocation}
              onChange={(e) => setHiringLocation(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
            />
          </div>
          {/* <div className="flex flex-col gap-3">
             <label htmlFor="">Remote Position (optional)</label>
             <input type="checkbox" className="checkbox checkbox-primary" />
           </div> */}

          <div className="flex gap-4 w-full">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-[18px] font-dm">
                Job Type
              </label>
              <select
                value={jobType as JobTypeEnumType}
                onChange={(e) => setJobType(e.target.value as JobTypeEnumType)}
                className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white">
                <option value="">Select job type</option>
                <option value="Full_Time">Full-time</option>
                <option value="Part_Time">Part-Time</option>
                <option value="Fresher">Fresher</option>
              </select>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-[18px] font-dm">
                Job salary
              </label>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                type="text"
                className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-[18px] font-dm">
                Job experience
              </label>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                type="text"
                name=""
                id=""
                className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="" className="text-[18px] font-dm">
                Job Qualification
              </label>
              <input
                value={jobQualification}
                onChange={(e) => setJobQualification(e.target.value)}
                type="text"
                name=""
                id=""
                className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
              />
            </div>
          </div>

          <label htmlFor="" className="text-[18px] font-dm">
            Job Category
          </label>
          <select
            className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
            value={jobCategory ?? ""}
            onChange={(e) => setJobCategory(e.target.value as JobCategoriesType)}>
            <option value="">Select Category</option>
            {JobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="" className="text-[18px] font-dm">
            Closing date
          </label>
          <DatePicker
            selected={closingDate}
            onChange={(date) => setClosingDate(date)}
            className="w-full p-3 rounded-2xl border border-[#1844B5] outline-none"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />

          <label htmlFor="" className="text-[18px] font-dm">
            Responsibilities
          </label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder={`Write responsibilities, one per line...`}
            className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-60 p-4"></textarea>
          <label htmlFor="" className="text-[18px] font-dm">
            Requirements
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder={`Write responsibilities, one per line...`}
            className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-60 p-4"></textarea>
          <label htmlFor="" className="text-[18px] font-dm">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-60 p-4"></textarea>
          <button className="w-full rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800  focus:bg-blue-800  disabled:bg-blue-900">
            {createStart ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Save changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
