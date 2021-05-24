const express = require("express");
const router = express.Router({ mergeParams: true });
const { DislikedVideo } = require("../models/dislike.model");
const {
  getVideos,
  postVideo,
  deleteVideo,
} = require("../controllers/historyLikeSave.controller");
const { searchVideoById } = require("../middlewares/paramHandler");

router
  .route("/")
  .get(async (req, res, next) => {
    getVideos(req, res, next, DislikedVideo, "dislikes");
  })
  .post(async (req, res, next) => {
    postVideo(req, res, next, DislikedVideo);
  });

router.param("videoId", async (req, res, next, videoId) => {
  searchVideoById(req, res, next, DislikedVideo);
});

router
  .route("/:videoId")
  .delete(deleteVideo);

module.exports = router;
