import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { PlusCircle, X } from "lucide-react";

import type {
  Awards,
  CreateProfilePayloadType,
  Education,
  WorkExperience,
} from "../../../types/api.type";
import { type GenderEnumType } from "../../../constant";
import { createProfileApiFn } from "../../../lib/api";
import toast from "react-hot-toast";
import type { AppDispatch } from "../../../redux/store";
import { fetchCurrentUser } from "../../../redux/user/user.slice";
import { filterAwards, filterEducation, filterWorkExperience } from "../../../lib/helper";

const CreateUserProfile = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [profileUploadStart, setProfileUploadStart] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [gender, setGender] = useState<GenderEnumType>();
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { company: "", position: "", startDate: null, endDate: null, description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { collegeName: "", department: "", startDate: null, endDate: null, description: "" },
  ]);
  const [awards, setawards] = useState<Awards[]>([{ name: "", date: null, description: "" }]);

  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const filePicker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileImage) {
      if (!profileUploadStart) {
        profileUpload();
      }
    }
  }, [profileImage]);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileUrl(URL.createObjectURL(file));
    }
  };

  const profileUpload = async () => {
    if (!profileImage) return;
    setProfileUploadStart(true);

    try {
      const unsignedPreset = import.meta.env.VITE_UNSIGNED_PRESET;
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      const formData = new FormData();

      formData.append("file", profileImage);
      formData.append("upload_preset", unsignedPreset);
      formData.append("cloud_name", cloudName);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(`Cloudinary upload failed: ${res.status} - ${errorText}`);
        setProfileUploadStart(false);
        return;
      }

      const data = await res.json();
      if (data.error) {
        toast.error(data.error.message);
        setProfileUploadStart(false);
        return;
      }

      setProfileUrl(data.secure_url);
      toast.success("Image uploaded successfully");
      setProfileUploadStart(false);
    } catch (error: any) {
      toast.error(error.message);
      setProfileUploadStart(false);
    }
  };

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
    if (profileUploadStart) {
      toast.error("profile image is uploading");
    }

    const skillsArray = skills.split(",");
    const laguageArray = language.split(",");
    const filteredWorkExperience = filterWorkExperience(workExperience);
    const filteredAwards = filterAwards(awards);
    const filteredEducation = filterEducation(education);

    const payLoad: CreateProfilePayloadType = {
      profileUrl: profileUrl,
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
      const data = await createProfileApiFn(userId as string, payLoad);
      if (data) {
        toast.success(data.message);
        dispatch(fetchCurrentUser());
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[800px] mx-auto bg-[#F5F7FF] p-7 rounded-2xl">
      <p className=" text-3xl text-black font-semibold font-dm mt-10 text-center">
        Create your profile
      </p>
      <form action="" className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 items-center mt-5">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Upload your profile photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white w-40 h-40 hidden"
            ref={filePicker}
            onChange={handleProfileImage}
          />
          <div className="">
            <img
              onClick={() => filePicker.current?.click()}
              src={profileUrl || "/profile_img.jpeg"}
              alt=""
              className="w-30 h-30 object-cover rounded-full"
            />
            {profileUploadStart && <p className="text-green-700 pl-3">Uploading...</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            About
          </label>
          <textarea
            value={bio}
            required
            onChange={(e) => setBio(e.target.value)}
            placeholder="write about you"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white h-40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Location
          </label>
          <input
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Language
          </label>
          <input
            value={language}
            required
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Enter your languages in comas"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Skills
          </label>
          <input
            value={skills}
            required
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter your skills in comas..."
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Qualification
          </label>
          <input
            value={qualification}
            required
            onChange={(e) => setQualification(e.target.value)}
            placeholder="Enter your language"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
          />
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Age
            </label>
            <input
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as GenderEnumType)}
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white w-full">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <p className="text-black mt-3 text-xl font-semibold">Work experiance</p>
        {workExperience.map((exp, index) => (
          <div className="" key={index}>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Company
                </label>
                <input
                  value={exp.company}
                  required
                  onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                  placeholder="comapny name"
                  className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Position
                </label>
                <input
                  value={exp.position}
                  required
                  onChange={(e) => handleWorkExperienceChange(index, "position", e.target.value)}
                  placeholder="Enter your position"
                  className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
                />
              </div>
            </div>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Closing date
                </label>
                <DatePicker
                  selected={exp.startDate}
                  onChange={(date) => handleWorkExperienceChange(index, "startDate", date)}
                  className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Closing date
                </label>
                <DatePicker
                  selected={exp.endDate}
                  onChange={(date) => handleWorkExperienceChange(index, "endDate", date)}
                  className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[18px] text-gray-400">
                Description
              </label>
              <textarea
                value={exp.description}
                required
                onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}
                placeholder="write about your experiance"
                className="p-3 rounded-2xl outline-none border border-gray-500 bg-white h-40"
              />
            </div>
            <div className="">
              {index >= 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="bg-red-600 rounded-full  flex text-white ml-1">
                  <X color="white" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={addWorkExperience}
            className="flex bg-blue-700 text-white p-1 rounded-md gap-2 "
            type="button">
            <PlusCircle /> Add another
          </button>
        </div>

        <p className="text-black mt-3 text-xl font-semibold">Education details</p>

        {education.map((edu, index) => (
          <div key={index}>
            <div className="flex w-full gap-4 mt-2">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  College Name
                </label>
                <input
                  value={edu.collegeName}
                  required
                  onChange={(e) => handleEducationChange(index, "collegeName", e.target.value)}
                  placeholder="comapny name"
                  className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Department
                </label>
                <input
                  value={edu.department}
                  required
                  onChange={(e) => handleEducationChange(index, "department", e.target.value)}
                  placeholder="Enter your position"
                  className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
                />
              </div>
            </div>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Start date
                </label>
                <DatePicker
                  selected={edu.startDate}
                  onChange={(date) => handleEducationChange(index, "startDate", date)}
                  className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Closing date
                </label>
                <DatePicker
                  selected={edu.endDate}
                  onChange={(date) => handleEducationChange(index, "endDate", date)}
                  className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[18px] text-gray-400">
                Description
              </label>
              <textarea
                value={edu.description}
                required
                onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                placeholder="write about your experiance"
                className="p-3 rounded-2xl outline-none border border-gray-500 bg-white h-40"
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
            className="flex bg-blue-700 text-white p-1 rounded-md gap-2 "
            type="button">
            <PlusCircle /> Add another
          </button>
        </div>

        {awards.map((awa, index) => (
          <div className="" key={index}>
            <div className="flex w-full gap-4 ">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Name
                </label>
                <input
                  value={awa.name}
                  required
                  onChange={(e) => handleAwardChange(index, "name", e.target.value)}
                  placeholder="comapny name"
                  className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="" className="text-[18px] text-gray-400">
                  Date
                </label>
                <DatePicker
                  selected={awa.date}
                  onChange={(date) => handleAwardChange(index, "date", date)}
                  className="w-full p-3 rounded-2xl border border-gray-500 outline-none"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[18px] text-gray-400">
                Description
              </label>
              <textarea
                value={awa.description}
                required
                onChange={(e) => handleAwardChange(index, "description", e.target.value)}
                placeholder="write about your experiance"
                className="p-3 rounded-2xl outline-none border border-gray-500 bg-white h-40"
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
        <button
          disabled={profileUploadStart}
          className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-dm px-5 py-2.5 text-center me-2 mb-2 text-xl mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUserProfile;
