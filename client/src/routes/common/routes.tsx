import CreateCompany from "../../pages/Create-company";
import CreateJob from "../../pages/create-job";
import LandingPage from "../../pages/landing-page";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import SingleJobDetails from "../../pages/Single-job-details";
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, RECRUITER_ONLY_ROUTES } from "./routePaths";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <LandingPage /> }];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.JOBS_DETAILS,
    element: <SingleJobDetails />,
  },
];

export const recruiterOnlyRoutePaths = [
  { path: RECRUITER_ONLY_ROUTES.CREATE_COMPANY, element: <CreateCompany /> },
  {
    path: RECRUITER_ONLY_ROUTES.CREATE_JOB,
    element: <CreateJob />,
  },
];
