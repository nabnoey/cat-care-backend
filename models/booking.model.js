import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  cat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cat",
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "done"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
