import { Router } from "express";
import {
  createCompanyController,
  deleteCompanyController,
  getRecruiterCurrentCompanyController,
} from "../controllers/company.controller";

const companyRoutes = Router();

companyRoutes.post("/create/new", createCompanyController);
companyRoutes.get("/currentCompany", getRecruiterCurrentCompanyController);
companyRoutes.delete("/:id/delete", deleteCompanyController);

export default companyRoutes;
