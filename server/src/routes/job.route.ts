import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
} from "../controllers/job.controller";

const jobRoutes = Router();

jobRoutes.post("/company/:companyId/create/new", createJobController);
jobRoutes.get("/all", getAllJobsController);
jobRoutes.get("/:jobId", getJobByIdController);

export default jobRoutes;
