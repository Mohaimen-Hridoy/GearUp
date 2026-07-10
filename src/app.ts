import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRoutes } from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GearUp backend starter is running",
    errorDetails: null,
  });
});

app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
