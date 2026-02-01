import express from "express";
import {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
  seedServices,
} from "../controllers/service.controller.js";

import { upload, uploadToSupabase } from "../middlewares/supabase.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);

router.post(
  "/",
  auth,
  upload,
  uploadToSupabase,
  createService
);

router.put(
  "/:id",
  auth,
  upload,
  uploadToSupabase,
  updateService
);

router.delete("/:id", auth, deleteService);
router.post("/seed/init", seedServices);

export default router;
