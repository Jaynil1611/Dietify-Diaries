const { Video } = require("../models/video.model");
const { videoData } = require("./video.data");

async function storeVideos() {
  try {
    videoData.forEach(async (video) => {
      const videoToBeSaved = new Video(video);
      const savedVideo = await videoToBeSaved.save();
    });
  } catch (error) {
    console.log("Error saving videos to db!");
  }
}

module.exports = { storeVideos };
