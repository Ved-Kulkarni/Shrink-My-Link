import mongoose, { mongo } from "mongoose";

const urlSchema = mongoose.Schema({
  shortCode: String,
  longURL: String
})

export const URL = mongoose.model("shortURL", urlSchema)