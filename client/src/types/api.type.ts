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
  user: {
    _id: string;
    name: string;
    email: string;
    profile: string | null;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
    role: "recruiter" | "candidate";
  };
};
