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
  locationID: {
    type: String,
    required: true,
  },
  addressComponents: {
    type: Array,
    required: true,
  },
  formattedAddress: {
    type: String,
    required: true,
  },
  mapPosition: {
    type: Object,
    required: true,
  },
  views: {
    type: Number,
  },
  categories: {
    type: Array,
    max: 5,
    required: true,
  },
  imageURLs: {
    type: Array,
    max: 5,
    min: 3,
    required: true,
  },

  city: {
    type: Array,
    required: true,
  },
  state: {
    type: Array,
    required: true,
  },
  area: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Market", marketSchema);
