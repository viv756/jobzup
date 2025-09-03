import CreateCompany from "../../pages/profile/recruiter/Create-company";
import CreateJob from "../../pages/profile/recruiter/Create-job";
import LandingPage from "../../pages/home";
import SignIn from "../../pages/auth/sign-in";
import SignUp from "../../pages/auth/sign-up";
import JobDetails from "../../pages/job-details";
import CreateUserProfile from "../../pages/profile/user/CreateUserProfile";
import DashBoard from "../../pages/profile/dashboard";
import AllJobs from "../../pages/jobs";

import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, RECRUITER_ONLY_ROUTES } from "./routePaths";
import MyJobs from "../../pages/profile/recruiter/my-jobs/MyJobs";

export const publicRoutePaths = [
  { path: PUBLIC_ROUTES.HOME, element: <LandingPage /> },
  {
    path: PUBLIC_ROUTES.JOBS_DETAILS,
    element: <JobDetails />,
  },
  {
    path: PUBLIC_ROUTES.JOBS,
    element: <AllJobs />,
  },
];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
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
  { path: RECRUITER_ONLY_ROUTES.MY_JOBS, element: <MyJobs /> },
];
