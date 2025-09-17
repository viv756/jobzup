import { Types } from "mongoose";
import Profilemodel from "../models/profile.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";
import { CreateProfileType, UpdateProfileType } from "../validation/profile.validation";

export const createProfileService = async (body: CreateProfileType, userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundExeption("User is not found");
  }

  const userProfile = new Profilemodel({
    userId: userId,
    bio: body.bio,
    location: body.location,
    language: body.language,
    skills: body.skills,
    phone: body.phone,
    workExperience: body.workExperience,
    education: body.education,
    awards: body.awards,
    qualification: body.qualification,
    gender: body.gender,
    age: body.age,
    profileUrl: body.profileUrl,
  });

  await userProfile.save();

  // add the profile _id to user
  user.profile = userProfile._id as Types.ObjectId;
  if (body.profileUrl) {
    user.profilePicture = body.profileUrl as string;
  }
  // add phone number to user
  if (body.phone) {
    user.phone = body.phone;
  }

  await user.save();

  return { userProfile };
};

export const getUserProfileService = async (userId: string) => {
  const userProfile = await Profilemodel.findOne({ userId });
  if (!userProfile) {
    throw new NotFoundExeption("Profile not found");
  }

  return { userProfile };
};

export const getCurrentuserProfileService = async (userId: string) => {
  const userProfile = await Profilemodel.findOne({ userId });
  if (!userProfile) {
    throw new NotFoundExeption("Profile not found");
  }

  return { userProfile };
};

export const updateProfileService = async (userId: string, body: UpdateProfileType) => {
  const profile = await Profilemodel.findOne({ userId });
  if (!profile) {
    throw new NotFoundExeption("Profile not found");
  }

  const updatedProfile = await Profilemodel.findByIdAndUpdate(
    profile._id,
    { ...body },
    { new: true }
  );

  if (!updatedProfile) {
    throw new BadRequestException("Failed to update profile");
  }

  return { updatedProfile };
};
