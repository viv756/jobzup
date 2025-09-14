import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput, { isValidPhoneNumber, type Value } from "react-phone-number-input";

import { useAppSelector } from "../../../../hooks/useSelector";
import { useAppDispatch } from "../../../../hooks/useReducer";
import { updateCurrentUser } from "../../../../redux/user/user.slice";
import { userSettingApiFn } from "../../../../lib/api";

const PersonalInfoChangingForm = () => {
  const { currentUser } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState<Value | undefined>(currentUser?.phone as Value);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>(currentUser?.profilePicture as string);
  const [profileUploadStart, setProfileUploadStart] = useState<boolean>(false);
  const [phoneInputError, setPhoneInputError] = useState<string | undefined>();

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

    const payLoad = {
      name,
      email,
      profilePicture: profileUrl,
      phone: phone as string,
    };

    try {
      const data = await userSettingApiFn(payLoad);

      if (data) {
        toast.success(data.message);
        dispatch(updateCurrentUser(data.updatedUser));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form action="" className="mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-dm">Your photo</p>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="p-3 rounded-2xl outline-none border border-gray-500 bg-white w-40 h-40 hidden"
                ref={filePicker}
                onChange={handleProfileImage}
              />
              <img
                src={profileUrl}
                alt=""
                className="w-40 h-40 rounded-sm"
                onClick={() => filePicker.current?.click()}
              />
              <p className="text-sm font-dm text-wrap">
                No file chosen Update your photo manually, if the photo is not set the default
                Avatar will be the same as your login email account.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-dm font-medium">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="font-dm">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="font-dm font-medium">
                Phone number
              </label>
              <PhoneInput
                international
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                className="p-3 rounded-sm outline-none border border-gray-500 bg-white w-full focus:border-blue-700"
              />
              {phoneInputError && <p className="text-red-700"> {phoneInputError}</p>}
            </div>
          </div>
        </div>
        <button className="rounded-lg border border-blue-[#1844B5] bg-[#0851CA] px-3 py-2 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 mt-6">
          Save changes
        </button>
      </form>
    </>
  );
};

export default PersonalInfoChangingForm;
