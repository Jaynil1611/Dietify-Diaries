import axios from "axios";
import { handleToast } from "../components";

export const getDuration = (duration) => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;
  return `${hours > 0 ? hours.toString() + ":" : ""}${
    minutes > 0 ? minutes.toString() + ":" : ""
  }${seconds < 10 ? "0" + seconds.toString() : seconds}`;
};

export const getPublishedDate = (date) => {
  date = new Date(date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).toString();
};

export const getListDetails = (list, itemId) => {
  return list.find(({ id }) => id === itemId);
};

export const getPublishDistance = (formatDistance, date) => {
  return date ? formatDistance(new Date(date), new Date()) : "";
};

export const getSearchedData = (videoList, searchQuery) => {
  return searchQuery
    ? videoList.filter((video) => compare(video, searchQuery.toLowerCase()))
    : videoList;
};

export const compare = ({ title, channelTitle }, search) => {
  return matchData(title, search) || matchData(channelTitle, search);
};

export const matchData = (data, search) => data.toLowerCase().includes(search);

export const checkVideoExists = (list, videoId) => {
  return list.find(({ id, status }) => id === videoId && status !== "deleted");
};

export const addVideo = (list, video) => {
  return list.concat(video);
};

export const removeVideo = (list, videoId) => {
  return list.filter(({ id }) => id !== videoId);
};

export const addNewPlaylist = (playlists, playlist) => {
  return playlists.concat(playlist);
};

export const removePlaylist = (list, playlistId) => {
  return list.filter(({ id }) => id !== playlistId);
};

export const updatePlaylist = (playlists, updatedPlaylist) => {
  return playlists.map((playlist) =>
    playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
  );
};

export const getFilteredList = (list) => {
  return list.filter(({ videoList }) => videoList.length > 0);
};

export const addVideoToTop = (list, video) => {
  return [video, ...list];
};

export const updateVideoPosition = (list, videoId) => {
  return list.reduce((result, video) => {
    return video.id === videoId ? [video, ...result] : result.concat(video);
  }, []);
};

export const getUpdatedTagData = (list, tag) => {
  return tag ? list.filter(({ tags }) => tags.includes(tag)) : list;
};

export const getVideoFromList = (list, videoId) => {
  return list.find(({ id }) => id === videoId);
};

export const setupAuthHeaderForServerCalls = (AUTH_TOKEN) => {
  return AUTH_TOKEN
    ? (axios.defaults.headers.common["Authorization"] = AUTH_TOKEN)
    : delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (dispatch) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        handleToast(dispatch, "You need to login to perform the action!");
      }
      return Promise.reject(error);
    }
  );
};
