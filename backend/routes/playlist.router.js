const express = require("express");
const router = express.Router({ mergeParams: true });
const { playlistParamHandler } = require("../middlewares/paramHandler");
const {
  getPlaylists,
  postPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller");

router
  .route("/")
  .get(getPlaylists)
  .post(postPlaylist);

router
  .param("playlistId", playlistParamHandler);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .post(updatePlaylist)
  .delete(deletePlaylist);

module.exports = router;
