import mongoose from "mongoose";

const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, unique: true },
    gId: { type: String, unique: true, default: "" },
    role: { type: String, default: "member" }
  })
);

export default userModel;
