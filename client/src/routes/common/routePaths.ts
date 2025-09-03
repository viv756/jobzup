export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  JOBS: "/jobs/all",
  JOBS_DETAILS: "/job/:jobId",
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  PROFILE: "/profile/update",
  CREATE_PROFILE: "/profile/create/:userId",
  COMPANY_DETAILS: "/company/:companyId",
  DAHSBOARD: "/profile/dashboard",
};

export const RECRUITER_ONLY_ROUTES = {
  CREATE_JOB: "/profile/create/job/:companyId",
  MY_JOBS :'/profile/my-jobs',
  CREATE_COMPANY: "/profile/create/company",
};
