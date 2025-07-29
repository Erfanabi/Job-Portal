import { Router } from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import { upload } from "../common/utils/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// Route to get all jobs data
router.get("/", getUserData);

// Route to get a single job data
router.post("/apply", applyForJob);

// Route to get a single job data
router.get("/application", getUserJobApplications);

// Route to get a single job data
router.post("/update-resume", upload.single("resume"), updateUserResume);

export const UserRouter = router;
