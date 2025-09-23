import { Router } from "express";
import {
  createMeetingController,
  getMeetingOfUserController,
} from "../controllers/meeting.controller";

const meetingRoutes = Router();

meetingRoutes.post(
  "/create/recruiter/:recruiterId/candidate/:candidateId",
  createMeetingController
);
meetingRoutes.get("/get", getMeetingOfUserController);

export default meetingRoutes;
