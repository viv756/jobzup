import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getAllJobsOfRecruiterController,
  getJobByIdController,
} from "../controllers/job.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const jobRoutes = Router();

jobRoutes.post("/company/:companyId/create/new", isAuthenticated, createJobController);
jobRoutes.get("/all", getAllJobsController);
jobRoutes.get("/:jobId", getJobByIdController);
jobRoutes.get('/recruiter/jobs',isAuthenticated,getAllJobsOfRecruiterController)

export default jobRoutes;
