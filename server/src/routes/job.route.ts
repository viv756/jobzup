import { Router } from "express";
import { createJobController, getJobByIdController } from "../controllers/job.controller";

const jobRoutes = Router()

jobRoutes.post("/company/:companyId/create/new", createJobController)
jobRoutes.get("/:jobId",getJobByIdController)

export default jobRoutes