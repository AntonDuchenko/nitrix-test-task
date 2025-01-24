import mongoose from "mongoose";

const appartmentSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 90 },
  description: { type: String, required: true, maxLenght: 335 },
  price: { type: Number, required: true, min: 0 },
  rooms: { type: Number, required: true, enum: [1, 2, 3] },
  photo_url: { type: String, required: false, default: "" },
});

export default mongoose.model("Appartment", appartmentSchema);
