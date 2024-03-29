const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const VideoSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    publishedAt: { type: String, required: true },
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: mongoose.SchemaTypes.Url, required: true },
    channelTitle: { type: String, required: true },
    tags: [String],
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
