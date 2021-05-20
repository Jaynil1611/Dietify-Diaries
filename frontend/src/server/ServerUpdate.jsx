import { callMockServer } from ".";
import { actions } from "../reducers";
import { checkVideoExists } from "../utils";
import { handleToast } from "../components";

const userId = "60a35a72ffb1fa01498940eb";

const constructURL = () => {
  return `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`;
};

// -------------------- Liked Server Updates ---------------------------------------------
const getRequestObject = (itemExists, video, resource) => {
  return itemExists
    ? {
        type: "delete",
        url: `${constructURL()}/${resource}/${video._id}`,
      }
    : {
        type: "post",
        url: `${constructURL()}/${resource}`,
        data: video,
      };
};

const addOrRemoveVideoFromLiked = async (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  const { response, error } = await callMockServer(
    getRequestObject(itemExists, video, "likes")
  );
  if (!error) {
    const { video: videoResponse } = response.data;
    handleToast(
      dispatch,
      itemExists ? "Removed from Liked videos" : "Added to Liked videos"
    );
    itemExists
      ? dispatch({
          type: actions.REMOVE_FROM_LIKED_LIST,
          payload: { id: video.id },
        })
      : dispatch({ type: actions.ADD_TO_LIKED_LIST, payload: videoResponse });
  }
};

// -------------------- Disliked Server Updates ---------------------------------------------
const addOrRemoveVideoFromDisliked = (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  handleToast(
    dispatch,
    itemExists ? "Dislike Removed" : "You disliked this video"
  );
  itemExists
    ? dispatch({
        type: actions.REMOVE_FROM_DISLIKED_LIST,
        payload: { id: video.id },
      })
    : dispatch({ type: actions.ADD_TO_DISLIKED_LIST, payload: video });
};

// -------------------- Playlist Server Updates ---------------------------------------------
const getRequestObjectForPlaylist = (itemExists, playlist, video) => {
  return {
    type: "post",
    url: `${constructURL()}/playlists/${playlist.id}`,
    data: {
      ...playlist,
      videoList: getUpdatedVideoListForPlaylist(
        itemExists,
        playlist.videoList,
        video
      ),
    },
  };
};

const getUpdatedVideoListForPlaylist = (itemExists, videoList, video) => {
  return itemExists
    ? videoList.filter(({ id }) => id !== video.id)
    : videoList.concat(video);
};

const addOrRemoveVideoFromPlaylist = async (dispatch, playlist, video) => {
  const itemExists = checkVideoExists(playlist.videoList, video.id);
  const { response, error } = await callMockServer(
    getRequestObjectForPlaylist(itemExists, playlist, video)
  );
  if (!error) {
    const { playlist: playlistResponse } = response.data;
    handleToast(
      dispatch,
      itemExists
        ? `Video removed from ${playlistResponse.name}`
        : `Video added to ${playlistResponse.name}`
    );
    return itemExists
      ? dispatch({
          type: actions.REMOVE_FROM_PLAYLIST,
          payload: { playlist: playlistResponse },
        })
      : dispatch({
          type: actions.ADD_TO_PLAYLIST,
          payload: { playlist: playlistResponse },
        });
  }
};

const addPlaylist = async (dispatch, name) => {
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/playlists`,
    data: {
      name,
      videoList: [],
    },
  });
  if (!error) {
    handleToast(dispatch, `${name} playlist created`);
    dispatch({
      type: actions.ADD_NEW_PLAYLIST,
      payload: response.data.playlist,
    });
  }
};

const removePlaylist = async (dispatch, playlist) => {
  const { response, error } = await callMockServer({
    type: "delete",
    url: `${constructURL()}/playlists/${playlist.id}`,
  });
  if (!error) {
    handleToast(dispatch, `${playlist.name} playlist deleted`);
    dispatch({
      type: actions.REMOVE_PLAYLIST,
      payload: response.data.playlist,
    });
  }
};

// -------------------- Save Server Updates ---------------------------------------------
const addOrRemoveVideoFromSaved = async (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  const { response, error } = await callMockServer(
    getRequestObject(itemExists, video, "saves")
  );
  if (!error) {
    const { video: videoResponse } = response.data;
    handleToast(
      dispatch,
      itemExists ? "Removed from Saved videos" : "Added to Saved videos"
    );
    itemExists
      ? dispatch({
          type: actions.REMOVE_FROM_SAVED_LIST,
          payload: { id: video.id },
        })
      : dispatch({ type: actions.ADD_TO_SAVED_LIST, payload: videoResponse });
  }
};

// -------------------- History Server Updates ---------------------------------------------
const addVideoToHistory = async (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  if (itemExists) {
    return dispatch({
      type: actions.UPDATE_HISTORY,
      payload: { id: video.id, shuffle: true },
    });
  }
  const { response, error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/history`,
    data: video,
  });
  if (!error) {
    const { video: videoResponse } = response.data;
    dispatch({
      type: actions.UPDATE_HISTORY,
      payload: videoResponse,
    });
  }
};

export {
  addOrRemoveVideoFromLiked,
  addOrRemoveVideoFromDisliked,
  addOrRemoveVideoFromPlaylist,
  addPlaylist,
  removePlaylist,
  addOrRemoveVideoFromSaved,
  addVideoToHistory,
};
