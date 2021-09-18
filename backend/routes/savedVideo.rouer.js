const express = require("express");
const router = express.Router({ mergeParams: true });
const { SavedVideo } = require("../models/savedVideo.model");
const {
  getVideos,
  postVideo,
  deleteVideo,
} = require("../controllers/historyLikeSave.controller");
const { searchVideoById } = require("../middlewares/paramHandler");

router
  .route("/")
  .get(async (req, res, next) => {
    getVideos(req, res, next, SavedVideo, "saves");
  })
  .post(async (req, res, next) => {
    postVideo(req, res, next, SavedVideo);
  });

router.param("videoId", async (req, res, next) => {
  searchVideoById(req, res, next, SavedVideo);
});

router
  .route("/:videoId")
  .delete(deleteVideo);

module.exports = router;
