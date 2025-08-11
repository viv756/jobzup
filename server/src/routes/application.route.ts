import { Router } from "express";
import {
  applyToAJobControlller,
  getuserAppliedJobsController,
} from "../controllers/application.controller";

const applicationRoutes = Router();

applicationRoutes.post(
  "/job/:jobId/company/:companyid/recruiter/:recruiterId",
  applyToAJobControlller
);
applicationRoutes.get("/user/appliedJobs", getuserAppliedJobsController);

export default applicationRoutes;
