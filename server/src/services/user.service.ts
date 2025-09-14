import Profilemodel from "../models/profile.model";
import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/appError";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return { user };
};

export const getUserByIdService = async (userId: string) => {
  const user = await UserModel.findById(userId).populate("profile");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return user.omitPassword();
};

export const userSettingsService = async (
  userId: string,
  body: {
    name: string;
    email: string;
    profilePicture: string;
    phone: string;
  }
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      ...body,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new BadRequestException("User not found");
  }

  const userProfile = await Profilemodel.findOne({ userId });
  if (userProfile) {
    userProfile.profileUrl = updatedUser.profilePicture;
    userProfile.phone = updatedUser.phone;
  }

  return updatedUser.omitPassword();
};
