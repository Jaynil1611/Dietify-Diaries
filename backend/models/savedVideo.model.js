const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedVideoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

const SavedVideo = mongoose.model("SavedVideo", SavedVideoSchema);

module.exports = { SavedVideo };
