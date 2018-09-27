import mongoose from "mongoose";

const pathSchema = mongoose.Schema({
  assetPath: { type: String, unique: true },
  thumbnailPath: { type: String, unique: true }
});

const authorSchema = mongoose.Schema({
  name: { type: String, unique: false },
  email: { type: String, unique: false },
  username: { type: String, unique: false }
});

const albumSchema = mongoose.Schema({
  name: { type: String, unique: false, default: "fiu" }
});

const assetModel = mongoose.model(
  "Asset",
  new mongoose.Schema({
    src: { type: String },
    thumbnail: { type: String },
    thumbnailWidth: { type: Number },
    thumbnailHeight: { type: Number },
    caption: { type: String },
    originalName: { type: String },
    adjustedName: { type: String },
    album: { type: albumSchema },
    tags: { type: Array },
    timestamp: { type: Date, default: Date.now() },
    author: { type: authorSchema },
    path: { type: pathSchema },
    metadata: { type: Object }
  })
);

export default assetModel;
