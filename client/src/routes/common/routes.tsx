import CreateCompany from "../../pages/recruiter/Create-company";
import CreateJob from "../../pages/recruiter/Create-job";
import LandingPage from "../../pages/landing-page";
import SignIn from "../../pages/auth/sign-in";
import SignUp from "../../pages/auth/sign-up";
import JobDetails from "../../pages/job-details/JobDetails";
import CreateUserProfile from "../../pages/user/CreateUserProfile";

import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, RECRUITER_ONLY_ROUTES } from "./routePaths";
import DashBoard from "../../pages/dashboard/DashBoard";

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
  {
    path: PROTECTED_ROUTES.CREATE_PROFILE,
    element: <CreateUserProfile />,
  },
  {
    path: PROTECTED_ROUTES.DAHSBOARD,
    element: <DashBoard />,
  },
];

export const recruiterOnlyRoutePaths = [
  { path: RECRUITER_ONLY_ROUTES.CREATE_COMPANY, element: <CreateCompany /> },
  {
    path: RECRUITER_ONLY_ROUTES.CREATE_JOB,
    element: <CreateJob />,
  },
];
