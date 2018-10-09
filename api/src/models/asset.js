import mongoose from "mongoose";

const assetModel = mongoose.model(
  "Asset",
  new mongoose.Schema({
    src: { type: String, required: true },
    thumb: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    filename: { type: String, required: true },
    tags: { type: Array, default: "fiu" },
    timestamp: { type: Date, default: Date.now() }
  })
);

export default assetModel;
