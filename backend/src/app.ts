import express, { Application } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import errorMiddleware from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import deliveryRoutes from "./routes/delivery.routes";

const app: Application = express();

const openApiPath = path.join(__dirname, "..", "openapi.json");
const swaggerDocument = JSON.parse(fs.readFileSync(openApiPath, "utf-8")) as Record<string, unknown>;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/delivery", deliveryRoutes);

const frontendPath = path.resolve(__dirname, "../../frontend");
app.use(express.static(frontendPath));

app.use(errorMiddleware);

export default app;