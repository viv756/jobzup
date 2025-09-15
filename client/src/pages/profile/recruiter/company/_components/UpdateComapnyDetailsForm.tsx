import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import type { Value } from "react-phone-number-input";

import { getCurrentCompanyApiFn, updateCompanyApiFn } from "../../../../../lib/api";
import type { CompanyType, CreateCompanyPayLoadType } from "../../../../../types/api.type";
import "react-phone-number-input/style.css";

const UpdateCompanyDetailsForm = () => {
  const [company, setComapny] = useState<CompanyType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateStart, setUpdateStart] = useState<boolean>(false);

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
  const [logoUrl, setLogourl] = useState<string | undefined>(undefined);
  const [phoneInputError, setPhoneInputError] = useState<string | undefined>();
  const [imageUploadingStart, setImageUploadingStart] = useState<boolean>(false);

  const filePicker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);

      try {
        const data = await getCurrentCompanyApiFn();
        if (data) {
          setComapny(data.company);
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    if (company) {
      setCompanyName(company.companyName || "");
      setEmail(company.email || "");
      setCompanysize(company.companySize || "");
      setFoundedIn(company.foundedIn ? new Date(company.foundedIn) : null);
      setAvgSalary(company.avgSalary || "");
      setLocation(company.location || "");
      setAbout(company.about || "");
      setPhone(company.phone as Value);
      setBackground(company.background?.join("\n") || "");
      setBenefits(company.benefits?.join("\n") || "");
      setFacebook(company.facebook || "");
      setInstagram(company.instagram || "");
      setTwitter(company.twitter || "");
      setWebsiteLink(company.websiteLink || "");
      setLogourl(company.companyLogo || "");
    }
  }, [company]);

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
    const toastId = toast.loading("Image is uploading");

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
        setImageUploadingStart(false);
        return;
      }

      setLogourl(data.secure_url);
      toast.dismiss(toastId);
      toast.success("Image uploaded successfully");
      setLogoFile(null);
      setImageUploadingStart(false);
    } catch (error: any) {
      setLogoFile(null);
      setImageUploadingStart(false);
      toast.dismiss(toastId);
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
    setUpdateStart(true);

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
      phone: phone as string,
      background: backgroundArray,
      benefits: benefitsArray,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      websiteLink: websiteLink,
      companyLogo: logoUrl as string,
    };

    try {
      const data = await updateCompanyApiFn(payload);
      if (data) {
        toast.success(data.message);
      }
      setUpdateStart(false);
    } catch (error: any) {
      toast.error(error.message);
      setUpdateStart(false);
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      {company && (
        <>
          <p className=" text-3xl text-black font-medium font-dm p-6">Company Details</p>
          <div className="w-[800px]   p-7 rounded-2xl bg-white">
            <form action="" className="w-full flex flex-col gap-3 mt-5" onSubmit={onSubmit}>
              <div className="flex items-center gap-8">
                <input
                  type="file"
                  accept="image/*"
                  className=" hidden"
                  ref={filePicker}
                  onChange={handleLogo}
                />

                <img
                  onClick={() => filePicker.current?.click()}
                  src={logoUrl}
                  alt=""
                  className="w-30 h-30 object-cover rounded-full"
                />

                <p className="text-wrap">
                  Update your company logo manually. If no logo is set, a default company logo will
                  be used.
                </p>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="" className="text-md font-dm">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  required
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full ">
                  <label htmlFor="" className="text-md font-dm">
                    Company Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    placeholder="Enter company email"
                    type="email"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor=" " className="text-md font-dm">
                    Company Location
                  </label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    value={location}
                    placeholder="Enter company location"
                    type="text"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full ">
                  <label htmlFor="" className="text-md font-dm">
                    Found In(Year)
                  </label>
                  <DatePicker
                    placeholderText="Select the year"
                    required
                    onChange={(date) => setFoundedIn(date)}
                    selected={foundedIn}
                    showYearPicker
                    dateFormat="yyyy"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor=" " className="text-md font-dm">
                    Company Size
                  </label>
                  <input
                    onChange={(e) => setCompanysize(e.target.value)}
                    required
                    placeholder="Enter the size of the company"
                    value={companySize}
                    type="number"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full ">
                  <label htmlFor="" className="text-md font-dm">
                    Avg.Salary
                  </label>
                  <input
                    placeholder="Enter the avarage salary"
                    required
                    type="number"
                    onChange={(e) => setAvgSalary(e.target.value)}
                    value={avgSalary}
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor=" " className="text-md font-dm">
                    Phone Number
                  </label>
                  <PhoneInput
                    international
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                  {phoneInputError && <p className="text-red-700"> {phoneInputError}</p>}
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full ">
                  <label htmlFor="" className="text-md font-dm">
                    Instagram
                  </label>
                  <input
                    placeholder="https://instagram.com"
                    onChange={(e) => setInstagram(e.target.value)}
                    value={instagram}
                    type="url"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor=" " className="text-md font-dm">
                    Facebook
                  </label>
                  <input
                    placeholder="https://facebook.com"
                    onChange={(e) => setFacebook(e.target.value)}
                    value={facebook}
                    type="url"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col w-full ">
                  <label htmlFor="" className="text-md font-dm">
                    Twitter
                  </label>
                  <input
                    placeholder="https://twitter.com"
                    onChange={(e) => setTwitter(e.target.value)}
                    value={twitter}
                    type="url"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor=" " className="text-md font-dm">
                    Company website link
                  </label>
                  <input
                    placeholder="https://google.com"
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    value={websiteLink}
                    type="url"
                    className="p-3 rounded-2xl outline-none border border-[#1844B5] bg-white"
                  />
                </div>
              </div>

              <label htmlFor="" className="text-md font-dm">
                Company Description
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                minLength={20}
                maxLength={500}
                required
                placeholder="Write short description about the company"
                className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-30 p-4"></textarea>
              <label htmlFor="" className="text-md font-dm">
                Essential Knowledge, Skills, and Experience
              </label>
              <textarea
                onChange={(e) => setBackground(e.target.value)}
                value={background}
                placeholder="Write about company background.. one per line"
                minLength={20}
                maxLength={500}
                required
                className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-30 p-4"></textarea>
              <label htmlFor="" className="text-md font-dm">
                Benifits
              </label>
              <textarea
                onChange={(e) => setBenefits(e.target.value)}
                value={benefits}
                minLength={20}
                maxLength={500}
                required
                placeholder="Write about benefits.. one per line"
                className="w-full bg-white outline-none border border-[#1844B5] rounded-2xl h-30 p-4"></textarea>

              <button
                disabled={imageUploadingStart}
                className=" rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800  focus:bg-blue-800  w-full disabled:bg-blue-900">
                {updateStart ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Save changes"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateCompanyDetailsForm;
