import CreateCompany from "../../pages/profile/recruiter/Create-company";
import CreateJob from "../../pages/profile/recruiter/Create-job";
import LandingPage from "../../pages/home";
import SignIn from "../../pages/auth/sign-in";
import SignUp from "../../pages/auth/sign-up";
import JobDetails from "../../pages/job-details";
import CreateUserProfile from "../../pages/profile/user/CreateUserProfile";
import DashBoard from "../../pages/profile/dashboard";
import AllJobs from "../../pages/jobs";
import MyJobs from "../../pages/profile/recruiter/my-jobs";
import Applicants from "../../pages/profile/recruiter/applicants";
import UserProfile from "../../pages/profile/recruiter/user-profile";

import {
  AUTH_ROUTES,
  BASEROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  RECRUITER_ONLY_ROUTES,
} from "./routePaths";
import CompanyPage from "../../pages/profile/recruiter/company";
import Settings from "../../pages/profile/settings";

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
    path: PROTECTED_ROUTES.DAHSBOARD,
    element: <DashBoard />,
  },
  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
  },
];

export const recruiterOnlyRoutePaths = [
  {
    path: RECRUITER_ONLY_ROUTES.CREATE_JOB,
    element: <CreateJob />,
  },
  { path: RECRUITER_ONLY_ROUTES.MY_JOBS, element: <MyJobs /> },
  {
    path: RECRUITER_ONLY_ROUTES.PROFILE_VIEW,
    element: <UserProfile />,
  },
  { path: RECRUITER_ONLY_ROUTES.APPLICANTS, element: <Applicants /> },
  { path: RECRUITER_ONLY_ROUTES.COMPANY, element: <CompanyPage /> },
];

export const baseRoutePaths = [
  { path: BASEROUTES.CREATE_COMPANY, element: <CreateCompany /> },
  {
    path: BASEROUTES.CREATE_PROFILE,
    element: <CreateUserProfile />,
  },
  
];
