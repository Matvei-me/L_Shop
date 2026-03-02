import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;