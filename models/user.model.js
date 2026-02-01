import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, min: 4 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true, min: 6 },
  phoneNumber: { type: String },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
});

export default mongoose.model("User", UserSchema);
