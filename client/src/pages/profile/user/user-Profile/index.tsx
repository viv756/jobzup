import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";

import { useAppSelector } from "../../../../hooks/useSelector";
import type { GenderEnumType } from "../../../../constant";
import type {
  Awards,
  Education,
  UpdateUserProfilePayloadType,
  WorkExperience,
} from "../../../../types/api.type";
import { getCurrentUserProfileApiFn, updateUserProfile } from "../../../../lib/api";
import { filterAwards, filterEducation, filterWorkExperience } from "../../../../lib/helper";

const Profile = () => {
  const { currentUser } = useAppSelector((store) => store.user);
  const [formSbmiting, setFormSubmiting] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [age, setAge] = useState<string | undefined>("");
  const [qualification, setQualification] = useState<string | undefined>("");
  const [skills, setSkills] = useState<string>("");
  const [gender, setGender] = useState<GenderEnumType | undefined>();
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [awards, setawards] = useState<Awards[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getCurrentUserProfileApiFn();
        if (data?.userProfile) {
          const profile = data.userProfile;
          setBio(profile.bio);
          setLocation(profile.location);
          setLanguage(Array.isArray(profile.language) ? profile.language.join(", ") : "");
          setSkills(Array.isArray(profile.skills) ? profile.skills.join(", ") : "");
          setQualification(profile.qualification);
          setAge(profile.age);
          setGender(profile.gender);

          setWorkExperience(
            (
              profile.workExperience ?? [
                { company: "", position: "", startDate: null, endDate: null, description: "" },
              ]
            ).map((exp: any) => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : null,
              endDate: exp.endDate ? new Date(exp.endDate) : null,
            }))
          );

          setawards(
            (profile.awards ?? [{ name: "", date: null, description: "" }]).map((awa: any) => ({
              ...awa,
              date: awa.date ? new Date(awa.date) : null,
            }))
          );

          setEducation(
            (
              profile.education ?? {
                collegeName: "",
                department: "",
                startDate: null,
                endDate: null,
                description: "",
              }
            ).map((edu) => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : null,
              endDate: edu.endDate ? new Date(edu.endDate) : null,
            }))
          );
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handleWorkExperienceChange = <K extends keyof WorkExperience>(
    index: number,
    field: K,
    value: WorkExperience[K]
  ) => {
    const updated = [...workExperience];
    updated[index][field] = value;
    setWorkExperience(updated);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { company: "", position: "", startDate: null, endDate: null, description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updated);
  };

  const handleEducationChange = <K extends keyof Education>(
    index: number,
    field: K,
    value: Education[K]
  ) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { collegeName: "", department: "", startDate: null, endDate: null, description: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  const handleAwardChange = <K extends keyof Awards>(index: number, field: K, value: Awards[K]) => {
    const updated = [...awards];
    updated[index][field] = value;
    setawards(updated);
  };

  const addAwards = () => {
    setawards([...awards, { name: "", date: null, description: "" }]);
  };

  const removeAwards = (index: number) => {
    const updated = awards.filter((_, i) => i !== index);
    setawards(updated);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormSubmiting(true);

    const skillsArray = skills.split(",");
    const laguageArray = language.split(",");
    const filteredWorkExperience = filterWorkExperience(workExperience);
    const filteredAwards = filterAwards(awards);
    const filteredEducation = filterEducation(education);

    const payLoad: UpdateUserProfilePayloadType = {
      bio,
      location,
      language: laguageArray,
      skills: skillsArray,
      age,
      awards: filteredAwards,
      gender,
      qualification,
      education: filteredEducation,
      workExperience: filteredWorkExperience,
    };

    try {
      const data = await updateUserProfile(payLoad);
      if (data) {
        toast.success(data.message);
        setFormSubmiting(false);
      }
      setFormSubmiting(false);
    } catch (error: any) {
      setFormSubmiting(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="h-30 flex items-center">
        <h1 className="text-3xl font-semibold font-satoshi">Welcome back! {currentUser?.name}</h1>
      </div>
      <form action="" className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="flex gap-6">
          <img
            src={currentUser?.profilePicture}
            alt=""
            className="w-50 h-50 object-cover rounded-md"
          />

          <div className="w-full">
            <label htmlFor="" className="text-lg font-dm">
              About
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              name=""
              id=""
              className="p-3 w-full h-42 font-dm rounded-md outline-none border border-[#1844B5] "></textarea>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="w-full">
            <label htmlFor="" className="text-md font-dm">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-md font-dm">
              Language
            </label>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              type="text"
              className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="" className="text-md font-dm">
            Skills
          </label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            type="text"
            className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  w-full"
          />
        </div>

        <div className="flex gap-4 ">
          <div className="w-full">
            <label htmlFor="" className="text-md font-dm">
              Qualification
            </label>
            <input
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              type="text"
              className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-md font-dm">
              Age
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  w-full"
            />
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-md font-dm">
              Gender
            </label>
            <select
              className="p-3 font-dm rounded-md outline-none border border-[#1844B5]  w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value as GenderEnumType)}>
              <option disabled value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <p className="text-black mt-3 text-xl font-satoshi font-semibold">Work experience</p>
        {workExperience.map((exp, index) => (
          <div className="" key={index}>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-md font-dm">
                  Company
                </label>
                <input
                  value={exp.company}
                  required
                  onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                  placeholder="company name"
                  className="p-3 font-dm rounded-md outline-none border border-[#1844B5]  "
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-md font-dm">
                  Position
                </label>
                <input
                  value={exp.position}
                  required
                  onChange={(e) => handleWorkExperienceChange(index, "position", e.target.value)}
                  placeholder="Enter your position"
                  className="p-3 rounded-md font-dm outline-none border border-[#1844B5] "
                />
              </div>
            </div>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-md font-dm">
                  Start date
                </label>
                <DatePicker
                  selected={exp.startDate}
                  onChange={(date) => handleWorkExperienceChange(index, "startDate", date)}
                  className="w-full p-3 font-dm rounded-md border border-[#1844B5] outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-md font-dm">
                  End date
                </label>
                <DatePicker
                  selected={exp.endDate}
                  onChange={(date) => handleWorkExperienceChange(index, "endDate", date)}
                  className="w-full p-3 font-dm rounded-md border border-[#1844B5] outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-md font-dm">
                Description
              </label>
              <textarea
                value={exp.description}
                required
                onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}
                placeholder="write about your experiance"
                className="p-3 font-dm rounded-md outline-none border border-[#1844B5] h-40"
              />
            </div>
            <div className="">
              {index >= 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="bg-red-600 font-dm rounded-full  flex text-white ml-1">
                  <X color="white" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={addWorkExperience}
            className="flex bg-blue-700 font-dm text-white p-1 rounded-md gap-2 "
            type="button">
            <PlusCircle /> Add another
          </button>
        </div>

        <p className="text-black mt-3 text-xl font-satoshi font-semibold">Education details</p>

        {education.map((edu, index) => (
          <div key={index}>
            <div className="flex w-full gap-4 mt-2">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-md font-dm">
                  College Name
                </label>
                <input
                  value={edu.collegeName}
                  required
                  onChange={(e) => handleEducationChange(index, "collegeName", e.target.value)}
                  placeholder="comapny name"
                  className="p-3 rounded-md font-dm outline-none border border-[#1844B5] "
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-md font-dm">
                  Department
                </label>
                <input
                  value={edu.department}
                  required
                  onChange={(e) => handleEducationChange(index, "department", e.target.value)}
                  placeholder="Enter your position"
                  className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  "
                />
              </div>
            </div>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-md font-dm">
                  Start date
                </label>
                <DatePicker
                  selected={edu.startDate}
                  onChange={(date) => handleEducationChange(index, "startDate", date)}
                  className="w-full p-3 rounded-md font-dm border border-[#1844B5] outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-md font-dm">
                  End date
                </label>
                <DatePicker
                  selected={edu.endDate}
                  onChange={(date) => handleEducationChange(index, "endDate", date)}
                  className="w-full p-3 rounded-md font-dm border border-[#1844B5] outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-md font-dm">
                Description
              </label>
              <textarea
                value={edu.description}
                required
                onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                placeholder="description"
                className="p-3 rounded-md font-dm outline-none border border-[#1844B5]  h-40"
              />
              <div className="">
                {index >= 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="bg-red-600 rounded-full  flex text-white ml-1">
                    <X color="white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={addEducation}
            className="flex bg-blue-700 font-dm text-white p-1 rounded-md gap-2 "
            type="button">
            <PlusCircle /> Add another
          </button>
        </div>

        <p className="text-black mt-3 text-xl font-satoshi font-semibold">Awards</p>
        {awards.map((awa, index) => (
          <div className="" key={index}>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-md font-dm">
                  Name
                </label>
                <input
                  value={awa.name}
                  required
                  onChange={(e) => handleAwardChange(index, "name", e.target.value)}
                  placeholder="company name"
                  className="p-3 rounded-md font-dm outline-none border border-[#1844B5] "
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-md font-dm">
                  Date
                </label>
                <DatePicker
                  selected={awa.date}
                  onChange={(date) => handleAwardChange(index, "date", date)}
                  className="w-full p-3 font-dm rounded-md border border-[#1844B5] outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-md font-dm">
                Description
              </label>
              <textarea
                value={awa.description}
                required
                onChange={(e) => handleAwardChange(index, "description", e.target.value)}
                placeholder="write about your award"
                className="p-3 rounded-md outline-none border font-dm border-[#1844B5] h-40"
              />
            </div>
            <div className="">
              {index >= 1 && (
                <button
                  type="button"
                  onClick={() => removeAwards(index)}
                  className="bg-red-600 rounded-full  flex text-white ml-1">
                  <X color="white" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={addAwards}
            className="flex bg-blue-700 text-white p-1 rounded-md gap-2 "
            type="button">
            <PlusCircle /> Add another
          </button>
        </div>
        <div className="flex justify-center h-30">
          <button
            disabled={formSbmiting}
            className=" w-150 h-13 rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 text-center text-xl font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800  focus:bg-blue-800 mt-8 disabled:bg-blue-900">
            {formSbmiting ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
