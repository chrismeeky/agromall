import { Schema, model } from "mongoose";

const categoriesSchema = Schema({
  categories: {
    type: Array,
    max: 100,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Categories", categoriesSchema);
