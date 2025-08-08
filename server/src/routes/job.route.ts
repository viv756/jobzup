import { Router } from "express";
import { createJobController } from "../controllers/job.controller";

const jobRoutes = Router()

jobRoutes.post("/company/:companyId/create/new", createJobController)

export default jobRoutes