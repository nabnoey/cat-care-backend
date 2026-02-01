import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ageYears: { type: Number, default: 0 },
  ageMonths: { type: Number, default: 0 },
  imageUrl: { type: String },
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

export default Cat; 
