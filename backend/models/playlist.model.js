const mongoose = require("mongoose");
const { Schema } = mongoose;

const opts = { toJSON: { virtuals: true }, timestamps: true  };

const PlaylistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  videoList: [{ type: Schema.Types.ObjectId, ref: "Video" }]
}, opts);

const Playlist = mongoose.model('Playlist', PlaylistSchema);


module.exports = { Playlist };