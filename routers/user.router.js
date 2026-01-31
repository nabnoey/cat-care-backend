import express from 'express'; // framework ของ Node.js สำหรับสร้าง Web Server และ API
// import UserModel from "../models/user.model.js";
import userController from '../controllers/user.controller.js';

const router = express.Router();
//http://localhost:5000/api/users/register
router.post("/register",userController.register);
router.post("/login",userController.login);

export default router;