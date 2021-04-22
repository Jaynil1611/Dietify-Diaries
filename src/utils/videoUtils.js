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

const getListDetails = (list, itemId) => {
  return list.find(({ id }) => id === itemId);
};

const getPublishDistance = (formatDistance, date) => {
  return date ? formatDistance(new Date(date), new Date()) : "";
};

const getSearchedData = (videoList, searchQuery) => {
  return searchQuery
    ? videoList.filter((video) => compare(video, searchQuery.toLowerCase()))
    : videoList;
};

const compare = ({ title, channelTitle }, search) => {
  return matchData(title, search) || matchData(channelTitle, search);
};

const matchData = (data, search) => data.toLowerCase().includes(search);

const checkVideoExists = (list, videoId) => {
  return list.find(({ id, status }) => id === videoId && status !== "deleted");
};

const addVideo = (list, video) => {
  return list.concat(video);
};

const removeVideo = (list, videoId) => {
  return list.filter(({ id }) => id !== videoId);
};

const addNewPlaylist = (playlists, playlist) => {
  return playlists.concat(playlist);
};

const updatePlaylist = (playlists, updatedPlaylist) => {
  return playlists.map((playlist) =>
    playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
  );
};

const addVideoToPlaylist = (playlists, updatedPlaylist) => {
  return playlists.map((playlist) => {
    if (playlist.id === updatedPlaylist.id) {
      return updatedPlaylist;
    }
    return playlist;
  });
};

const removeVideoFromPlaylist = (playlists, updatedPlaylist) => {
  return playlists.map((playlist) => {
    if (playlist.id === updatedPlaylist.id) {
      return updatedPlaylist;
    }
    return playlist;
  });
};

const getFilteredList = (list) => {
  return list.filter(({ status }) => status !== "deleted");
};

export {
  getDuration,
  getPublishedDate,
  getListDetails,
  getPublishDistance,
  checkVideoExists,
  removeVideo,
  addVideo,
  addVideoToPlaylist,
  addNewPlaylist,
  removeVideoFromPlaylist,
  getSearchedData,
  getFilteredList,
  updatePlaylist,
};
