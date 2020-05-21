import { Schema, model } from "mongoose";

const marketSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  marketName: {
    type: String,
    max: 20,
    required: true,
  },
  marketDescription: {
    type: String,
    max: 500,
    required: true,
  },
  location: {
    type: String,
    max: 100,
    required: true,
  },
  categories: {
    type: Array,
    max: 5,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Market", marketSchema);
