const { Video } = require("../models/video.model");
const { Playlist } = require("../models/playlist.model");

const videoParamHandler = async (req, res, next, videoId) => {
  try {
    let video = await Video.findById(videoId);
    if (!video) {
      return res
        .status(400)
        .json({ success: false, message: "Video not found!" });
    }
    req.video = video;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't retrieve the video",
      errorMessage: error.message,
    });
  }
};

const playlistParamHandler = async (req, res, next, playlistId) => {
  try {
    const { userId } = req.params;
    let playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) {
      return res
        .status(400)
        .json({ success: false, message: "Playlist not found!" });
    }
    req.playlist = playlist;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't retrieve the playlist",
      errorMessage: error.message,
    });
  }
};

const searchVideoById = async (req, res, next, Model) => {
  try {
    const { userId, videoId } = req.params;
    const video = await Model.findOne({ userId, videoId });
    if (!video) {
      return res
        .status(400)
        .json({ success: false, message: "Video not found!" });
    }
    req.video = video;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Couldn't retrieve the video`,
      errorMessage: error.message,
    });
  }
};

module.exports = { videoParamHandler, playlistParamHandler, searchVideoById };
