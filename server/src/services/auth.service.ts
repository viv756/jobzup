import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/appError";

export const registerService = async (body: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { name, email, password, confirmPassword } = body;

  if (password !== confirmPassword) {
    throw new BadRequestException("Password not matching");
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const user = new UserModel({
      name,
      email,
      password,
    });
    await user.save();

    return { userId: user._id };
  } catch (error) {
    throw error;
  }
};
