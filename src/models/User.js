import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    max: 20,
    min: 2,
  },

  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  profilePicture: {
    type: String,
    min: 10,
    max: 100,
  },

  role: {
    type: String,
    default: "member",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
