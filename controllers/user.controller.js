import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// register
const register = async (req, res) => {
  const { username, email, password, confirmPassword, phoneNumber } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "รหัสผ่านกับการยืนยันรหัสผ่านไม่ตรงกัน" });
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "มีชื่อผู้ใช้นี้ในระบบแล้ว" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "customer", // ✅ fix role ฝั่ง backend
    });

    res.send({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "ไม่มีชื่อผู้ใช้นี้ในระบบ" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }, // ✅ แนะนำ
      (err, token) => {
        if (err) {
          return res.status(500).send({ message: "สร้าง token ไม่สำเร็จ" });
        }

        res.send({
          message: "เข้าสู่ระบบสำเร็จ",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,  
            phoneNumber: user.phoneNumber,
            role: user.role,
            accessToken: token,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ✅ ฟังก์ชันสำหรับสร้าง Admin (ยิง API นี้เพื่อสร้าง Admin)
const createAdmin = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "รหัสผ่านกับการยืนยันรหัสผ่านไม่ตรงกัน" });
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "มีชื่อผู้ใช้นี้ในระบบแล้ว" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: "admin", // 👈 กำหนดเป็น admin
    });

    res.send({ message: "สร้างบัญชี Admin สำเร็จ" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ✅ ดึงข้อมูลโปรไฟล์ของตัวเอง (Get Me)
const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send({ message: "ไม่พบผู้ใช้งาน" });
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default {
  register,
  login,
  createAdmin,
  getProfile,
};
