import mongoose from "mongoose";

const assetModel = mongoose.model(
  "Asset",
  new mongoose.Schema({
    src: { type: String, required: true },
    thumbnail: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    filename: { type: String, required: true },
    tags: { type: Array, default: "fiu" },
    path: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now() }
  })
);

export default assetModel;
