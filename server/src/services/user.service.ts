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

  return { user };
};
