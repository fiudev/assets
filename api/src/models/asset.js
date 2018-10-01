import mongoose from "mongoose";

const assetModel = mongoose.model(
  "Asset",
  new mongoose.Schema({
    uploadedBy: { type: String, required: true },
    filename: { type: String, required: true },
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
    // tags: { type: Array },
    timestamp: { type: Date, default: Date.now() }
  })
);

export default assetModel;
