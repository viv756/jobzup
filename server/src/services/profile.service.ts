import Profilemodel from "../models/profile.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";
import { CreateProfileType, UpdateProfileType } from "../validation/profile.validation";

export const createProfileService = async (body: CreateProfileType, userId: string) => {
  const userProfile = new Profilemodel({
    userId: userId,
    bio: body.bio,
    location: body.location,
    language: body.language,
    skills: body.skills,
    workExperiance: body.workExperiance,
    education: body.education,
    awards: body.awards,
    qualification: body.qualification,
    gender: body.gender,
    age: body.age,
  });

  await userProfile.save();

  return { userProfile };
};

export const getUserProfileService = async (userId: string) => {
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
