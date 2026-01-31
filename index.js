import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.router.js";
import catRouter from "./routers/cat.router.js";
import serviceRouter from "./routers/service.router.js";
import bookingRouter from "./routers/booking.router.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
   origin: "https://cat-care-frontend-4amraun2s-nabnoeys-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("<h1>ได้จ้า</h1>");
});


app.use("/uploads", express.static("uploads"));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/cats", catRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
