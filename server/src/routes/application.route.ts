import { Router } from "express";
import {
  applyToAJobController,
  cancelApplicationController,
  dashboardInfoController,
  getAllApplicantionsController,
  getuserAppliedJobsController,
  updateAppicationStatusController,
} from "../controllers/application.controller";

const applicationRoutes = Router();

applicationRoutes.post(
  "/job/:jobId/company/:companyId/recruiter/:recruiterId",
  applyToAJobController
);
applicationRoutes.get("/user/appliedJobs", getuserAppliedJobsController);
applicationRoutes.get("/recruiter/dashboard/info", dashboardInfoController);
applicationRoutes.get("/recruiter/applicants/all", getAllApplicantionsController);
applicationRoutes.delete("/job/cancel/:applicationId", cancelApplicationController);
applicationRoutes.put("/status/update/:applicationId", updateAppicationStatusController);

export default applicationRoutes;
