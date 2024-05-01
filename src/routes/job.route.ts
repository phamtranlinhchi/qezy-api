
import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import jobController from "../controllers/job.controller";

export const jobRouter: Router = express.Router();

// /api/jobs/
jobRouter.get("/", auth, jobController.getJobs);
jobRouter.post("/", auth, jobController.createJobs);
jobRouter.get("/all", auth, jobController.getAllJobs);
