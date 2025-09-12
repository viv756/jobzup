import { Router } from "express";
import {
  applyToAJobControlller,
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
applicationRoutes.get("/recruiter/recent/applicants", getRecentApplicantsController);
applicationRoutes.get("/recruiter/applicants/all", getAllApplicantionsController);
applicationRoutes.put("/status/update/:applicationId", updateAppicationStatusController);

export default applicationRoutes;
