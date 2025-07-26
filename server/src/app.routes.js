import { Router } from "express";
import { AuthRouter } from "./models/auth/auth.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);

export default mainRouter;
