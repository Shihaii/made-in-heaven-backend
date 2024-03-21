import mongoose from "mongoose";

export const CharacterSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  ability: String,
  host: String,
  show: Boolean,
});