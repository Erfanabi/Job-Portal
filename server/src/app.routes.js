import { Router } from "express";
import { AuthRouter } from "./models/auth/auth.routes.js";
import { CompanyRouter } from "./routes/companyRoutes.js";
import { JobRouter } from "./routes/jobRoutes.js";

const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/company", CompanyRouter);
mainRouter.use("/jobs", JobRouter);

export default mainRouter;
