import { v4 as uuidv4 } from "uuid";

const getDuration = (duration) => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;
  return `${hours > 0 ? hours.toString() + ":" : ""}${
    minutes > 0 ? minutes.toString() + ":" : ""
  }${seconds < 10 ? "0" + seconds.toString() : seconds}`;
};

const getPublishedDate = (date) => {
  date = new Date(date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).toString();
};

const getVideoDetails = (videoId, videoList) => {
  return videoList.find(({ id }) => id === videoId);
};

const getPublishDistance = (formatDistance, date) => {
  return date ? formatDistance(new Date(date), new Date()) : "";
};

const checkVideoExists = (list, videoId) => {
  return list.find(({ id, status }) => id === videoId && status !== "deleted");
};

const addVideo = (list, video) => {
  return list.concat(video);
};

const removeVideo = (list, videoId) => {
  return list.filter(({ id }) => id !== videoId);
};

const addNewPlaylist = (playlists, name) => {
  return playlists.concat({ id: uuidv4(), name, videoList: [] });
};

const addToPlaylist = (playlists, playlistId, video) => {
  return playlists.map((playlist) => {
    if (playlist.id === playlistId) {
      return { ...playlist, videoList: playlist.videoList.concat(video) };
    }
    return playlist;
  });
};

const removeFromPlaylist = (playlists, playlistId, videoId) => {
  return playlists.map((playlist) => {
    if (playlist.id === playlistId) {
      return {
        ...playlist,
        videoList: playlist.videoList.filter((video) => video.id !== videoId),
      };
    }
    return playlist;
  });
};

export {
  getDuration,
  getPublishedDate,
  getVideoDetails,
  getPublishDistance,
  checkVideoExists,
  removeVideo,
  addVideo,
  addToPlaylist,
  addNewPlaylist,
  removeFromPlaylist,
};
