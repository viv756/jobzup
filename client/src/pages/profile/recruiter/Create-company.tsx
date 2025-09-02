import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import toast from "react-hot-toast";

import { createCompanyApiFn } from "../../../lib/api";
import type { CreateCompanyPayLoadType } from "../../../types/api.type";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { fetchCurrentUser } from "../../../redux/user/user.slice";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [companySize, setCompanysize] = useState<string>("");
  const [foundedIn, setFoundedIn] = useState<Date | null>(null);
  const [avgSalary, setAvgSalary] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [phone, setPhone] = useState<Value>();
  const [background, setBackground] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [websiteLink, setWebsiteLink] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogourl] = useState<string | null>(null);
  const [phoneInputError, setPhoneInputError] = useState<string | undefined>();
  const [imageUploadingStart, setImageUploadingStart] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const filePicker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logoFile) {
      if (!imageUploadingStart) {
        uploadLogo();
      }
    }
  }, [logoFile]);

  const uploadLogo = async () => {
    if (!logoFile) return;
    setImageUploadingStart(true);

    try {
      const unsignedPreset = import.meta.env.VITE_UNSIGNED_PRESET;
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      const formData = new FormData();
      formData.append("file", logoFile);
      formData.append("upload_preset", unsignedPreset);
      formData.append("cloud_name", cloudName);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(`Cloudinary upload failed: ${res.status} - ${errorText}`);
        return;
      }

      const data = await res.json();
      if (data.error) {
        toast.error(data.error.message);
        setImageUploadingStart(false)
        return;
      }

      setLogourl(data.secure_url);
      toast.success("Image uploaded successfully");
      setImageUploadingStart(false);
    } catch (error: any) {
      setImageUploadingStart(false);
      toast.error(error.message);
    }
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogourl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = phone
      ? isValidPhoneNumber(phone)
        ? undefined
        : "Invalid phone number"
      : "Phone number required";

    if (error) {
      setPhoneInputError(error);
      return;
    }
    setPhoneInputError("");

    const formattedPhoneNumber = phone ? formatPhoneNumberIntl(phone) : "";

    const benefitsArray = benefits
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);
    const backgroundArray = background
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload: CreateCompanyPayLoadType = {
      companyName: companyName,
      companySize: companySize,
      email: email,
      foundedIn: foundedIn,
      avgSalary: avgSalary,
      location: location,
      about: about,
      phone: formattedPhoneNumber,
      background: backgroundArray,
      benefits: benefitsArray,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      websiteLink: websiteLink,
      companyLogo: logoUrl,
    };

    try {
      const data = await createCompanyApiFn(payload);
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
        Company Details
      </p>
      <form action="" className="w-full flex flex-col gap-3 mt-5" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Upload your company logo
          </label>
          <input
            type="file"
            accept="image/*"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white w-40 h-40 hidden"
            ref={filePicker}
            onChange={handleLogo}
          />
          <div>
            <img
              onClick={() => filePicker.current?.click()}
              src={logoUrl || "/company_logo.png"}
              alt=""
              className="w-30 h-30 object-cover rounded-full"
            />
            {imageUploadingStart && <p className="text-green-700 pl-3">Uploading...</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            required
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Company Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              placeholder="Enter company email"
              type="email"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Company Location
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              required
              value={location}
              placeholder="Enter company location"
              type="text"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Found In(Year)
            </label>
            <DatePicker
              placeholderText="Select the year"
              required
              onChange={(date) => setFoundedIn(date)}
              selected={foundedIn}
              showYearPicker
              dateFormat="yyyy"
              className="p-3 rounded-2xl border border-gray-500 bg-white w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Company Size
            </label>
            <input
              onChange={(e) => setCompanysize(e.target.value)}
              required
              placeholder="Enter the size of the company"
              value={companySize}
              type="number"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Avg.Salary
            </label>
            <input
              placeholder="Enter the avarage salary"
              required
              type="number"
              onChange={(e) => setAvgSalary(e.target.value)}
              value={avgSalary}
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Phone Number
            </label>
            <PhoneInput
              international
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white "
            />
            {phoneInputError && <p className="text-red-700"> {phoneInputError}</p>}
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Instagram
            </label>
            <input
              placeholder="https://instagram.com"
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
              type="url"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Facebook
            </label>
            <input
              placeholder="https://facebook.com"
              onChange={(e) => setFacebook(e.target.value)}
              value={facebook}
              type="url"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Twitter
            </label>
            <input
              placeholder="https://twitter.com"
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
              type="url"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Company website link
            </label>
            <input
              placeholder="https://google.com"
              onChange={(e) => setWebsiteLink(e.target.value)}
              value={websiteLink}
              type="url"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <label htmlFor="" className="text-[18px] text-gray-400">
          Company Description
        </label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          minLength={20}
          maxLength={500}
          required
          placeholder="Write short description about the company"
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-30 p-4"></textarea>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Essential Knowledge, Skills, and Experience
        </label>
        <textarea
          onChange={(e) => setBackground(e.target.value)}
          value={background}
          placeholder="Write about company background.. one per line"
          minLength={20}
          maxLength={500}
          required
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-30 p-4"></textarea>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Benifits
        </label>
        <textarea
          onChange={(e) => setBenefits(e.target.value)}
          value={benefits}
          minLength={20}
          maxLength={500}
          required
          placeholder="Write about benefits.. one per line"
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-30 p-4"></textarea>

        <button
          disabled={imageUploadingStart}
          className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg font-dm px-5 py-2.5 text-center me-2 mb-2 text-xl mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
