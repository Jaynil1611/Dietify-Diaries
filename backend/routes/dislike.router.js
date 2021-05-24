const express = require("express");
const router = express.Router({ mergeParams: true });
const { DislikedVideo } = require("../models/dislike.model");
const {
  getVideos,
  deleteVideo,
} = require("../controllers/historyLikeSave.controller");
const { searchVideoById } = require("../middlewares/paramHandler");
const { postVideoAfterCheck } = require("../controllers/dislikedVideos.controller");

router
  .route("/")
  .get(async (req, res, next) => {
    getVideos(req, res, next, DislikedVideo, "dislikes");
  })
  .post(postVideoAfterCheck);

router.param("videoId", async (req, res, next, videoId) => {
  searchVideoById(req, res, next, DislikedVideo);
});

router.route("/:videoId").delete(deleteVideo);

module.exports = router;
