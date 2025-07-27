import { Router } from "express";
import { AuthRouter } from "./models/auth/auth.routes.js";
import { CompanyRouter } from "./routes/companyRoutes.js";

const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/company", CompanyRouter);

export default mainRouter;
