import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },   // อาบน้ำ–ตัดขน
  price: { type: Number, required: true },
  type: {
    type: String,
    enum: ["grooming", "hotel"],
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
