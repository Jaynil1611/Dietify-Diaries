const { Video } = require("../models/video.model");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get videos!",
      errorMessage: error.message,
    });
  }
};

const getVideoById = async (req, res) => {
  const { video } = req;
  res.status(200).json({ success: true, video });
};

module.exports = { getVideos, getVideoById };
