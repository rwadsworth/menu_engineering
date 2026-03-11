import express from "express";
import menuRouter from "./routes/menu";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.use("/api/menu", menuRouter);

app.listen(PORT, () => {
  console.log(`Bella Napoli API running on http://localhost:${PORT}`);
});

