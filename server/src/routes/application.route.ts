import { Router } from "express";
import {
  applyToAJobControlller,
  dashboardInfoController,
  getAllApplicantionsController,
  getRecentApplicantsController,
  getuserAppliedJobsController,
  updateAppicationStatusController,
} from "../controllers/application.controller";

const applicationRoutes = Router();

applicationRoutes.post(
  "/job/:jobId/company/:companyId/recruiter/:recruiterId",
  applyToAJobControlller
);
applicationRoutes.get("/user/appliedJobs", getuserAppliedJobsController);
applicationRoutes.get("/recruiter/dashboard/info", dashboardInfoController);
applicationRoutes.get("/recruiter/applicants/all", getAllApplicantionsController);
applicationRoutes.put("/status/update/:applicationId", updateAppicationStatusController);

export default applicationRoutes;
