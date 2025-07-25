import express from "express"
import cors from "cors"
import "dotenv/config"

dotenv.config();

async function main() {
  // Initialize Express
  const app = express();

  // Middlewares
      app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch(error => {
  console.error(`Error in main: ${error.message}`);
  process.exit(1);
});
