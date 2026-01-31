import express from "express";
import { createCat } from "../controllers/cat.controller.js";
import { uploadCat } from "../middlewares/uploadCat.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadCat.single("image"),
  createCat
);

export default router;
