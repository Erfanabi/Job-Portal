import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";
import AllExceptionHandler from "./src/common/exception/all-exception.handler.js";
import notFoundError from "./src/common/exception/not-found.handler.js";
import mainRouter from "./src/app.routes.js";
import connectCloudinary from "./src/config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function main() {
  // Initialize Express
  const app = express();

  // Connect to database
  await connectDB();
  await connectCloudinary();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // static public folder
  app.use("/public", express.static(path.join(__dirname, "public")));

  // route
  app.use(mainRouter);

  // expetion middleware
  app.use(AllExceptionHandler);
  app.use(notFoundError);

  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch(error => {
  console.error(`Error in main: ${error.message}`);
  process.exit(1);
});
