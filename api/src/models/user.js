import mongoose from "mongoose";

const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, unique: true },
    role: { type: String, default: "user" }
  })
);

export default userModel;
