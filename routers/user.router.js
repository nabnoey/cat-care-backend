import express from 'express'; // framework ของ Node.js สำหรับสร้าง Web Server และ API
// import UserModel from "../models/user.model.js";
import userController from '../controllers/user.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
// Endpoint: /api/v1/users/register
router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/create-admin", userController.createAdmin); 
router.get("/profile", authMiddleware, userController.getProfile);

export default router;