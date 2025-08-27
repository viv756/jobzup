import mongoose from "mongoose";
import CompanyModel from "../models/company.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundExeption } from "../utils/appError";

export const createCompanyService = async (
  userId: string,
  body: {
    companyName: string;
    email: string;
    companySize: string;
    foundedIn: string;
    avgSalary: string;
    location: string;
    about: string;
    phone: string;
    background: string[];
    benefits: string[];
    facebook?: string;
    instagram?: string;
    twitter?: string;
    companyLogo: string;
    websiteLink?: string;
  }
) => {
  const userCurrentCompany = await CompanyModel.findOne({ createdBy: userId });
  if (userCurrentCompany) {
    throw new BadRequestException("You have already registered a company");
  }

  const company = new CompanyModel({
    companyName: body.companyName,
    email: body.email,
    foundedIn: body.foundedIn,
    companySize: body.companySize,
    avgSalary: body.avgSalary,
    location: body.location,
    about: body.about,
    phone: body.phone,
    background: body.background,
    benefits: body.benefits,
    facebook: body.facebook,
    instagram: body.instagram,
    twiter: body.twitter,
    createdBy: userId,
    companyLogo: body.companyLogo,
    websiteLink: body.websiteLink,
  });

  await company.save();
  const user = await UserModel.findById(userId);

  if (user) {
    user.company = company._id as mongoose.Types.ObjectId;
  }

  return { company };
};

export const getRecruiterCurrentCompanyService = async (userId: string) => {
  const company = await CompanyModel.findOne({ createdBy: userId });

  if (!company) {
    throw new NotFoundExeption("Company not found");
  }

  return { company };
};

export const deleteComapnyService = async (userId: string, companyId: string) => {
  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new NotFoundExeption("Company not found");
  }

  // equals() is a method on ObjectId that can compare an ObjectId to either another objectId or string like userId
  if (!company.createdBy.equals(userId)) {
    throw new BadRequestException("You can only delete your company");
  }

  await company.deleteOne();

  return company;
};
