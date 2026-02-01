import express from "express";
import { createCat, getCats, getCatById, updateCat, deleteCat } from "../controllers/cat.controller.js";
import { upload, uploadToSupabase } from "../middlewares/supabase.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, upload, uploadToSupabase, createCat);
router.get("/my-cats", authMiddleware, getCats);
router.get("/:id", authMiddleware, getCatById);
router.put("/:id", authMiddleware, upload, uploadToSupabase, updateCat);
router.delete("/:id", authMiddleware, deleteCat);

export default router;