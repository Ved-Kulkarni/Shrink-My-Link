import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  longURL: { type: String, required: true },
});

export const URL = mongoose.model("URL", urlSchema);
