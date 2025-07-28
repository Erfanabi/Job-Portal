import { Router } from "express";
import { getJobById, getJobs } from "../controllers/jobController.js";

const router = Router();

// Route to get all jobs data
router.get("/", getJobs);

// Route to get a single job data
router.get("/:id", getJobById);

export const JobRouter = router;
