export type UserType = {
  _id: string;
  name: string;
  email: string;
  profile: string | null;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  role: "RECRUITER" | "CANDIDATE";
};

export type CompanyType = {
  _id: string;
  companyName: string;
  companySize: string;
  avgSalary: string;
  location: string;
  about: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  companyLogo: string;
  websiteLink: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

// **************Authentication Types**********************//

export type RegisterPayloadType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: "recruiter" | "candidate";
};

export type RegisterResponseType = {
  message: string;
};

export type LoginPayLoadType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  message: string;
  user: UserType;
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};


// *********************Company Types********************//

export type CreateCompanyPayLoadType = {
  companyName: string;
  companySize: string;
  avgSalary: string;
  location: string;
  about: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  companyLogo: string;
  websiteLink: string | null;
};

export type CreateCompanyResponseType = {
  message: string;
  company: CompanyType;
};

export type GetCurrentCompanyResponseType = {
  message: string;
  company: CompanyType;
};
