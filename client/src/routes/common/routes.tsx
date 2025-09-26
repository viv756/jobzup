import CreateCompany from "../../pages/profile/recruiter/Create-company";
import LandingPage from "../../pages/home";
import SignIn from "../../pages/auth/sign-in";
import SignUp from "../../pages/auth/sign-up";
import JobDetails from "../../pages/job-details";
import CreateUserProfile from "../../pages/profile/user/CreateUserProfile";
import DashBoard from "../../pages/profile/recruiter/dashboard";
import AllJobs from "../../pages/jobs";
import MyJobs from "../../pages/profile/recruiter/my-jobs";
import Applicants from "../../pages/profile/recruiter/applicants";
import UserProfile from "../../pages/profile/recruiter/user-profile";
import CompanyPage from "../../pages/profile/recruiter/company";
import Settings from "../../pages/profile/settings";
import Profile from "../../pages/profile/user/user-Profile";
import AppliedJobs from "../../pages/profile/user/applied-jobs";
import Messages from "../../pages/profile/messages/Index";
import Meetings from "../../pages/profile/meetings/Index";

import {
  AUTH_ROUTES,
  BASEROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  RECRUITER_ONLY_ROUTES,
} from "./routePaths";
import MeetingRoom from "../../pages/profile/meetings/_components/MeetingRoom";

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
  {
    path: PUBLIC_ROUTES.MEETING_ROOM,
    element: <MeetingRoom />,
  },
];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.PROFILE,
    element: <Profile />,
  },
  {
    path: PROTECTED_ROUTES.MY_JOBS,
    element: <AppliedJobs />,
  },
  {
    path: PROTECTED_ROUTES.MESSAGES,
    element: <Messages />,
  },
  {
    path: PROTECTED_ROUTES.MEETINGS,
    element: <Meetings />,
  },

  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
  },
];

export const recruiterOnlyRoutePaths = [
  {
    path: RECRUITER_ONLY_ROUTES.DAHSBOARD,
    element: <DashBoard />,
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
