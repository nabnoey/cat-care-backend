import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  services: [
    {
      type: String,
      enum: ["grooming", "hotel"]
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const Cat = mongoose.model("Cat", catSchema);

export default Cat; // 👈 สำคัญมาก
