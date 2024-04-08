import mongoose from "mongoose";
import { blob } from "stream/consumers";

export const CharacterSchema = new mongoose.Schema({
  name: String,
  img: Buffer,
  description: String,
  ability: String,
  host: String,
  show: Boolean,
});