import { RoleEnumType } from "../enums/user.enum";
import UserModel from "../models/user.model";
import { BadRequestException, UnauthorizedException } from "../utils/appError";

export const registerService = async (body: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role:RoleEnumType
}) => {
  const { name, email, password, confirmPassword,role } = body;

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
      role
    });
    await user.save();

    return { userId: user._id };
  } catch (error) {
    throw error;
  }
};

export const validateUserService = async (body: { email: string; password: string }) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new BadRequestException("User not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};
