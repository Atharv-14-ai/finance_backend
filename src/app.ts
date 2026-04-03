import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import recordRoutes from "./routes/record.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Finance Backend API Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(errorHandler);

export default app;