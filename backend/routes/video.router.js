const express = require("express");
const router = express.Router();
const { videoParamHandler } = require("../middlewares/paramHandler");
const { getVideos, getVideoById } = require("../controllers/video.controller");

router
  .route("/")
  .get(getVideos)

router
  .param("videoId", videoParamHandler);

router
  .route("/:videoId")
  .get(getVideoById)


module.exports = router;
