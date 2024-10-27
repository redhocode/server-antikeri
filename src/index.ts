import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger";
import { json } from "body-parser";
import userRoutes from "./routes/user.Routes";
import presensiRoutes from "./routes/presensi.Routes";
import searchRoutes from "./routes/search.Routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000; // Set a default port if not provided

// Middleware for logging requests
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Middleware to parse JSON
app.use(json());

// Logger middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Presensi API",
      version: "1.0.0",
      description: "API for Presensi",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Update the path according to your project structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable CORS
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/presensi", presensiRoutes);
app.use("/api/search", searchRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  logger.error("Server Error", { error: err.message });
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
