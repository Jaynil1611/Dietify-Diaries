const {
  getNormalizedVideo,
  getNormalizedVideoList,
} = require("../utils/normalizeData");

const getVideos = async (req, res, next, Model, name) => {
  try {
    const { userId } = req.params;
    let videos = await Model.find({ userId })
      .populate("videoId")
      .sort({ createdAt: "desc" });
    videos = getNormalizedVideoList(videos);
    res.status(200).json({ success: true, [name]: videos });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
};

const postVideo = async (req, res, next, Model) => {
  try {
    const { _id: videoId } = req.body;
    const { userId } = req.params;
    const checkVideoExists = await Model.findOne({ videoId });
    if (!checkVideoExists) {
      let newVideo = new Model({ userId, videoId });
      newVideo = await newVideo.save();
      newVideo = await newVideo.populate("videoId").execPopulate();
      normalizedVideo = getNormalizedVideo(newVideo._doc);
      return res.status(201).json({ success: true, video: normalizedVideo });
    }
    res.status(400).json({
      success: false,
      message: `Video already present in ${Model.modelName}!`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVideo = async (req, res) => {
  let { video } = req;
  try {
    video = await video.delete();
    res.status(200).json({ success: true, video });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVideos, postVideo, deleteVideo };
