const { DislikedVideo } = require("../models/dislike.model");
const { LikedVideo } = require("../models/likedVideo.model");
const { postVideo } = require("./historyLikeSave.controller");

const postVideoAfterCheck = async (req, res, next) => {
  const { _id: videoId } = req.body;
  const { userId } = req;
  try {
    await LikedVideo.findOneAndDelete({ videoId, userId });
    postVideo(req, res, next, DislikedVideo);
  } catch (error) {
    next(error);
  }
};

module.exports = { postVideoAfterCheck };
