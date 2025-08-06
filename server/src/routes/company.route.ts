import { Router } from "express";
import { createCompanyController } from "../controllers/company.controller";

const companyRoutes = Router();

companyRoutes.post("/create", createCompanyController);


export default companyRoutes