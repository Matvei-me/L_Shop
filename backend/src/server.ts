import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});