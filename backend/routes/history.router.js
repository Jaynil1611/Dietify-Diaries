const express = require("express");
const router = express.Router({ mergeParams: true });
const { History } = require("../models/history.model");
const {
  getVideos,
  postVideo,
  updateVideo,
} = require("../controllers/historyLikeSave.controller");

router
  .route("/")
  .get(async (req, res, next) => {
    getVideos(req, res, next, History, "history");
  })
  .post(async (req, res, next) => {
    postVideo(req, res, next, History);
  });

router.route("/:videoId").post(async (req, res, next) => {
  updateVideo(req, res, next, History);
});

module.exports = router;
