import Profilemodel from "../models/profile.model";
import { CreateProfileType } from "../validation/profile.validation";

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
