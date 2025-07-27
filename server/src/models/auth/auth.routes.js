import { Router } from "express";
import { signInHandler, signUpHandler } from "./auth.service.js";
import { upload } from "../../common/utils/multer.js";

const router = Router();

router.post("/sign-up", upload.single("profileImage"), signUpHandler);

router.post("/sign-in", signInHandler);

export const AuthRouter = router;
