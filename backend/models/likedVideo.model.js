const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  videoId: { type: Schema.Types.ObjectId, ref: "Video" }
}, { timestamps: true });

const LikedVideo = mongoose.model('LikedVideo', LikedVideoSchema);


module.exports = { LikedVideo };