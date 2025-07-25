import express from "express";
// import "./src/config/instrument.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { clerkWebhooks } from "./src/controllers/webhooks.js";
// import * as Sentry from "@sentry/node";

dotenv.config();

async function main() {
  // Initialize Express
  const app = express();

  // Connect to database
  await connectDB();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.post("/webhook", clerkWebhooks);

  app.use((req, res, next) => {
    return res.status(404).send("Not Found Route");
  });

  app.use((err, req, res, next) => {
    const status = err?.status ?? err?.statusCode ?? 500;
    let message = err?.message ?? "internal server error";

    if (err?.name === "ValidationError") {
      const { details } = err;
      message = details?.body?.[0]?.message ?? "internal server error";
    }

    return res.status(status).json({
      message,
    });
  });

  let port = process.env.PORT || 3000;

  // Sentry.setupExpressErrorHandler(app);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch(error => {
  console.error(`Error in main: ${error.message}`);
  process.exit(1);
});
