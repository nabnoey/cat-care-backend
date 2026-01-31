import express from "express";
import { getServices, createService } from "../controllers/service.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", authMiddleware, createService);

export default router;
