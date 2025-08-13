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
  CREATE_JOB: "/job/create",
  CREATE_PROFILE: "/profile/create/:userId",
  CREATE_COMPANY: "/register/create",
};
