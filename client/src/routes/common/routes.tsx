import CreateCompany from "../../pages/Create-company";
import CreateJob from "../../pages/Create-job";
import LandingPage from "../../pages/landing-page";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, RECRUITER_ONLY_ROUTES } from "./routePaths";
import JobDetails from "../../pages/job-details/JobDetails";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <LandingPage /> }];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.JOBS_DETAILS,
    element: <JobDetails />,
  },
];

export const recruiterOnlyRoutePaths = [
  { path: RECRUITER_ONLY_ROUTES.CREATE_COMPANY, element: <CreateCompany /> },
  {
    path: RECRUITER_ONLY_ROUTES.CREATE_JOB,
    element: <CreateJob />,
  },
];
