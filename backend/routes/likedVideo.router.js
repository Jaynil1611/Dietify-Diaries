const express = require("express");
const router = express.Router({ mergeParams: true });
const { LikedVideo } = require("../models/likedVideo.model");
const {
  getVideos,
  postVideo,
  deleteVideo,
} = require("../controllers/historyLikeSave.controller");
const { searchVideoById } = require("../middlewares/paramHandler");

router
  .route("/")
  .get(async (req, res, next) => {
    getVideos(req, res, next, LikedVideo, "likes");
  })
  .post(async (req, res, next) => {
    postVideo(req, res, next, LikedVideo);
  });

router.param("videoId", async (req, res, next) => {
  searchVideoById(req, res, next, LikedVideo);
});

router
  .route("/:videoId")
  .delete(deleteVideo);

module.exports = router;
