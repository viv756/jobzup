import { Router } from "express";
import { createCompanyController, getRecruiterCurrentCompany } from "../controllers/company.controller";

const companyRoutes = Router();

companyRoutes.post("/create/new", createCompanyController);
companyRoutes.get("/currentCompany",getRecruiterCurrentCompany)


export default companyRoutes