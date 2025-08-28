import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import { JobCategories, type JobCategoriesType, type JobTypeEnumType } from "../../constant";
import { createJobApiFn } from "../../lib/api";
import type { CreateJobPayloadType } from "../../types/api.type";
import "react-datepicker/dist/react-datepicker.css";

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [hiringLocation, setHiringLocation] = useState<string>("");
  const [jobType, setJobType] = useState<JobTypeEnumType | string>("");
  const [salary, setSalary] = useState<string>("");
  const [experiance, setExperiance] = useState<string>("");
  const [jobQualification, setJobQualification] = useState<string>("");
  const [jobCategory, setJobCategory] = useState<JobCategoriesType | string>("");
  const [description, setDescription] = useState<string>("");
  const [responsibilities, setResponsibilities] = useState<string>("");
  const [requirements, setRequerements] = useState<string>("");
  const [closingDate, setClosingDate] = useState<Date | null>(new Date());

  const { companyId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      hiringLocation: hiringLocation,
      experience: experiance,
      salary: salary,
      responsibilities: responsibilitiesArray,
      requirements: requirementsArray,
    };

    try {
      const data = await createJobApiFn(payload, companyId as string);
      if (data) {
        toast.success(data.message);
        navigate(`/job/${data.job._id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray3 max-w-[800px] p-10">
      <h1 className="text-2xl font-gray3 font-semibold font-roboto">Job Details</h1>
      <form onSubmit={onSubmit} className="flex  flex-col gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Job Title
          </label>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            name=""
            id=""
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Location
          </label>
          <input
            value={hiringLocation}
            onChange={(e) => setHiringLocation(e.target.value)}
            type="text"
            name=""
            id=""
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>
        {/* <div className="flex flex-col gap-3">
          <label htmlFor="">Remote Position (optional)</label>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </div> */}

        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Type
            </label>
            <select
              value={jobType as JobTypeEnumType}
              onChange={(e) => setJobType(e.target.value as JobTypeEnumType)}
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white">
              <option value="">Select job type</option>
              <option value="Full_Time">Full-time</option>
              <option value="Part_Time">Part-Time</option>
              <option value="Fresher">Fresher</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job salary
            </label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Experiance
            </label>
            <input
              value={experiance}
              onChange={(e) => setExperiance(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Qualification
            </label>
            <input
              value={jobQualification}
              onChange={(e) => setJobQualification(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <label htmlFor="" className="text-[18px] text-gray-400">
          Job Category
        </label>
        <select
          className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          value={jobCategory ?? ""}
          onChange={(e) => setJobCategory(e.target.value as JobCategoriesType)}>
          <option value="">Select Category</option>
          {JobCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Closing date
        </label>
        <DatePicker
          selected={closingDate}
          onChange={(date) => setClosingDate(date)}
          className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />

        <label htmlFor="" className="text-[18px] text-gray-400">
          Responsibilities
        </label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder={`Write responsibilities, one per line...`}
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Requirements
        </label>
        <textarea
          value={requirements}
          onChange={(e) => setRequerements(e.target.value)}
          placeholder={`Write responsibilities, one per line...`}
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>
        <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-roboto px-5 py-2.5 text-center me-2 mb-2 text-xl mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
