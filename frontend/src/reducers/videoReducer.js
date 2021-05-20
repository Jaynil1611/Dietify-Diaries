import {
  addNewPlaylist,
  addVideo,
  removeVideo,
  updatePlaylist,
  addVideoToTop,
  removePlaylist,
  updateVideoPosition,
} from "../utils";
import { actions } from "./Actions";

const videoReducer = (prevState, { type, payload }) => {
  switch (type) {
    case actions.INITIALIZE_LIST:
      return {
        ...prevState,
        [payload.name]: payload.data,
      };
    case actions.ADD_TO_LIKED_LIST:
      return {
        ...prevState,
        likedVideos: addVideo(prevState.likedVideos, payload),
        dislikedVideos: removeVideo(prevState.dislikedVideos, payload.id),
      };
    case actions.REMOVE_FROM_LIKED_LIST:
      return {
        ...prevState,
        likedVideos: removeVideo(prevState.likedVideos, payload.id),
      };
    case actions.ADD_TO_DISLIKED_LIST:
      return {
        ...prevState,
        dislikedVideos: addVideo(prevState.dislikedVideos, payload),
        likedVideos: removeVideo(prevState.likedVideos, payload.id),
      };
    case actions.REMOVE_FROM_DISLIKED_LIST:
      return {
        ...prevState,
        dislikedVideos: removeVideo(prevState.dislikedVideos, payload.id),
      };
    case actions.ADD_TO_PLAYLIST:
      return {
        ...prevState,
        playlists: updatePlaylist(prevState.playlists, payload.playlist),
      };
    case actions.REMOVE_FROM_PLAYLIST:
      return {
        ...prevState,
        playlists: updatePlaylist(prevState.playlists, payload.playlist),
      };
    case actions.ADD_NEW_PLAYLIST:
      return {
        ...prevState,
        playlists: addNewPlaylist(prevState.playlists, payload),
      };
    case actions.REMOVE_PLAYLIST:
      return {
        ...prevState,
        playlists: removePlaylist(prevState.playlists, payload.id),
      };
    case actions.UPDATE_SEARCH_PARAMETER:
      return {
        ...prevState,
        search: payload,
      };
    case actions.ADD_TO_SAVED_LIST:
      return {
        ...prevState,
        savedVideos: addVideo(prevState.savedVideos, payload),
      };
    case actions.REMOVE_FROM_SAVED_LIST:
      return {
        ...prevState,
        savedVideos: removeVideo(prevState.savedVideos, payload.id),
      };
    case actions.UPDATE_HISTORY:
      return {
        ...prevState,
        history: payload.shuffle
          ? updateVideoPosition(prevState.history, payload.id)
          : addVideoToTop(prevState.history, payload),
      };
    case actions.OPEN_OR_CLOSE_TOAST:
      return {
        ...prevState,
        showToast: payload.show,
        toastMessage: payload.text,
      };
    case actions.UPDATE_TAG:
      return { ...prevState, tag: payload };
    default:
      return prevState;
  }
};

export default videoReducer;
