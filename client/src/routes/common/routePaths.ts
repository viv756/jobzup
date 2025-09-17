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
  PROFILE: "/profile/user",
  MY_JOBS: "/profile/applied-jobs",
  COMPANY_DETAILS: "/company/:companyId",
  SETTINGS: "/profile/settings",
};

export const RECRUITER_ONLY_ROUTES = {
  DAHSBOARD: "/profile/dashboard",
  CREATE_JOB: "/profile/create/job",
  MY_JOBS: "/profile/my-jobs",
  APPLICANTS: "/profile/applicants",
  PROFILE_VIEW: "/profile/:userId",
  COMPANY: "/profile/company",
};

export const BASEROUTES = {
  CREATE_PROFILE: "/create/profile",
  CREATE_COMPANY: "/create/company",
};
