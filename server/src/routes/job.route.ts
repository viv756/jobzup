import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
} from "../controllers/job.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const jobRoutes = Router();

jobRoutes.post("/company/:companyId/create/new", isAuthenticated, createJobController);
jobRoutes.get("/all", getAllJobsController);
jobRoutes.get("/:jobId", getJobByIdController);

export default jobRoutes;
