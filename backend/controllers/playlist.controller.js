const { Playlist } = require("../models/playlist.model");
const { extend } = require("lodash");

const getPlaylists = async (req, res, next) => {
  try {
    const { userId } = req;
    let playlists = await Playlist.find({ userId }).populate("videoList");
    res.status(200).json({ success: true, playlists });
  } catch (error) {
    next(error);
  }
};

const postPlaylist = async (req, res, next) => {
  try {
    const { userId } = req;
    let playlist = req.body;
    const checkPlaylistExists = await Playlist.findOne({
      userId,
      name: playlist.name,
    });
    if (!checkPlaylistExists) {
      playlist = new Playlist({ userId, ...playlist });
      savedPlaylist = await playlist.save();
      playlist = await savedPlaylist.populate("videoList").execPopulate();
      return res.status(201).json({ success: true, playlist });
    }
    res
      .status(400)
      .json({ success: false, message: "Playlist already exists!" });
  } catch (error) {
    next(error);
  }
};

const getPlaylistById = async (req, res, next) => {
  let { playlist } = req;
  playlist = await playlist.populate("videoList").execPopulate();
  res.status(200).json({ success: true, playlist });
};

const updatePlaylist = async (req, res, next) => {
  let { playlist } = req;
  const playlistUpdates = req.body;
  playlist = extend(playlist, playlistUpdates);
  try {
    const updatedPlaylist = await playlist.save();
    playlist = await updatedPlaylist.populate("videoList").execPopulate();
    res.status(201).json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res) => {
  let { playlist } = req;
  try {
    playlist = await playlist.delete();
    res.status(200).json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlaylists,
  getPlaylistById,
  postPlaylist,
  updatePlaylist,
  deletePlaylist,
};
