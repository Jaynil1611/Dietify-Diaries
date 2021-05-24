const { DislikedVideo } = require("../models/dislike.model");
const { LikedVideo } = require("../models/likedVideo.model");
const { postVideo } = require("./historyLikeSave.controller");

const postVideoAfterCheck = async (req, res, next) => {
  const { _id: videoId } = req.body;
  try {
    const likedVideoExists = await LikedVideo.findOne({ videoId });
    if (likedVideoExists) {
      await likedVideoExists.delete();
    }
    postVideo(req, res, next, DislikedVideo);
  } catch (error) {
    next(error);
  }
};

module.exports = { postVideoAfterCheck };
