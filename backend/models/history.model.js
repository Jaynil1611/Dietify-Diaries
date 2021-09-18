const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  videoId: { type: Schema.Types.ObjectId, ref: "Video" }
}, { timestamps: true });

const History = mongoose.model('History', HistorySchema);


module.exports = { History };