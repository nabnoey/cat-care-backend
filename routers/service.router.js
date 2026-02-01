import express from "express";
import { getServices, createService, seedServices, getServiceById, updateService, deleteService } from "../controllers/service.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/list", getServices);
router.post("/add", authMiddleware, createService);
router.post("/seed", seedServices); // ไม่ต้อง login ก็ได้สำหรับ dev หรือจะใส่ authMiddleware ก็ได้
router.get("/:id", getServiceById);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;