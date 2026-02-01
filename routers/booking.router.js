import express from "express";
import { createBooking, getMyBookings, getAllBookings, getBookingById, updateBooking, deleteBooking, getAdminNotifications } from "../controllers/booking.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.get("/all", authMiddleware, getAllBookings);
router.get("/notifications", authMiddleware, getAdminNotifications); // ✅ API แจ้งเตือนสำหรับ Admin
router.get("/:id", authMiddleware, getBookingById);
router.put("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;