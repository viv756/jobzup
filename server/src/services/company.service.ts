import CompanyModel from "../models/company.model";

export const createCompanyService = async (
  userId: string,
  body: {
    companyName: string;
    companySize: string;
    avgSalary: string;
    location: string;
    about: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    companyLogo: string;
    websiteLink?: string;
  }
) => {
  const company = new CompanyModel({
    companyName: body.companyName,
    comapanySize: body.companySize,
    avgSalary: body.avgSalary,
    location: body.location,
    about: body.about,
    facebook: body.facebook,
    instagram: body.instagram,
    twiter: body.twitter,
    createdBy: userId,
    companyLogo: body.companyLogo,
    websiteLink: body.websiteLink,
  });

  await company.save();

  return { company };
};


