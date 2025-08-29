export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  PROFILE: "/profile/:userId",
  JOBS: "/jobs/all",
  JOBS_DETAILS: "/job/:jobId",
  CREATE_PROFILE: "/profile/create/:userId",
  COMPANY_DETAILS: "/company/:companyId",
  DAHSBOARD:"/dashboard"
};

export const RECRUITER_ONLY_ROUTES = {
  CREATE_JOB: "/create/job/:companyId",
  CREATE_COMPANY: "/create/company",
};
