import cors from "cors";
import express from "express";
import menuRouter from "./routes/menu";

const app = express();

app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : "*";

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api/menu", menuRouter);

export default app;
