import {
  addNewPlaylist,
  addVideo,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  removeVideo,
  updatePlaylist,
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
        playlists: addVideoToPlaylist(prevState.playlists, payload.playlist),
      };
    case actions.REMOVE_FROM_PLAYLIST:
      return {
        ...prevState,
        playlists: removeVideoFromPlaylist(
          prevState.playlists,
          payload.playlist
        ),
      };
    case actions.ADD_NEW_PLAYLIST:
      return {
        ...prevState,
        playlists: addNewPlaylist(prevState.playlists, payload),
      };
    case actions.REMOVE_PLAYLIST:
      return {
        ...prevState,
        playlists: updatePlaylist(prevState.playlists, payload),
      };
    case actions.UPDATE_SEARCH_PARAMETER:
      return {
        ...prevState,
        search: payload,
      };
    default:
      return prevState;
  }
};

export default videoReducer;
