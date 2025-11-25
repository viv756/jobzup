import { Router } from "express";
import {
  createJobController,
  getAllJobsController,
  getAllJobsOfRecruiterController,
  getJobByIdController,
  jobDeleteController,
  updateJobController,
} from "../controllers/job.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const jobRoutes = Router();

jobRoutes.post("/create/new", isAuthenticated, createJobController);
jobRoutes.get("/all", getAllJobsController);
jobRoutes.get("/:jobId", isAuthenticated, getJobByIdController);
jobRoutes.put("/update/:jobId", isAuthenticated, updateJobController);
jobRoutes.delete("/delete/:jobId", isAuthenticated, jobDeleteController);
jobRoutes.get("/recruiter/jobs", isAuthenticated, getAllJobsOfRecruiterController);

export default jobRoutes;
