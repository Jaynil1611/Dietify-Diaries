const mongoose = require("mongoose");
const { Schema } = mongoose;

const DislikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
  },
  { timestamps: true }
);

const DislikedVideo = mongoose.model("DislikedVideo", DislikeSchema);

module.exports = { DislikedVideo };
