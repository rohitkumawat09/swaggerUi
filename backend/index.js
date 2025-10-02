import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
const app = express();
app.use(express.json());
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", async (req, res) => {
  res.send("Your Backend is running live on AWS");
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
