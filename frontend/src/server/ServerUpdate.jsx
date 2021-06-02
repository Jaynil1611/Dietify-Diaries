import { callMockServer } from ".";
import { actions } from "../reducers";
import { checkVideoExists } from "../utils";
import { handleToast } from "../components";

export const constructURL = () => {
  return `${process.env.REACT_APP_BACKEND_URL}`;
};

// -------------------- Liked Server Updates ---------------------------------------------
export const getRequestObject = (itemExists, video, resource) => {
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

export const addOrRemoveVideoFromLiked = async (dispatch, list, video) => {
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
export const addOrRemoveVideoFromDisliked = async (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  const { response, error } = await callMockServer(
    getRequestObject(itemExists, video, "dislikes")
  );
  if (!error) {
    const { video: videoResponse } = response.data;
    handleToast(
      dispatch,
      itemExists ? "Dislike Removed" : "You disliked this video"
    );
    itemExists
      ? dispatch({
          type: actions.REMOVE_FROM_DISLIKED_LIST,
          payload: { id: video.id },
        })
      : dispatch({
          type: actions.ADD_TO_DISLIKED_LIST,
          payload: videoResponse,
        });
  }
};

// -------------------- Playlist Server Updates ---------------------------------------------
export const getRequestObjectForPlaylist = (itemExists, playlist, video) => {
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

export const getUpdatedVideoListForPlaylist = (
  itemExists,
  videoList,
  video
) => {
  return itemExists
    ? videoList.filter(({ id }) => id !== video.id)
    : videoList.concat(video);
};

export const addOrRemoveVideoFromPlaylist = async (
  dispatch,
  playlist,
  video
) => {
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

export const addPlaylist = async (dispatch, name) => {
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

export const removePlaylist = async (dispatch, playlist) => {
  const { response, error } = await callMockServer({
    type: "delete",
    url: `${constructURL()}/playlists/${playlist.id}`,
  });
  if (!error) {
    handleToast(dispatch, `${playlist.name} playlist deleted`);
    dispatch({
      type: actions.REMOVE_PLAYLIST,
      payload: { id: response.data.playlist.id },
    });
  }
};

// -------------------- Save Server Updates ---------------------------------------------
export const addOrRemoveVideoFromSaved = async (dispatch, list, video) => {
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
export const addVideoToHistory = async (dispatch, list, video) => {
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

// -------------------- User Server Updates ---------------------------------------------
export const signUpUser = async ({
  dispatch,
  firstname,
  lastname,
  email,
  password,
}) => {
  const { error } = await callMockServer({
    type: "post",
    url: `${constructURL()}/users`,
    data: { firstname, lastname, email, password },
  });
  if (!error) {
    handleToast(dispatch, "Sign up successful");
    return true;
  }
  handleToast(dispatch, "Sign up failed!");
  return false;
};

export const getUserDetails = async (dispatch) => {
  const { response, error } = await callMockServer({
    type: "get",
    url: `${constructURL()}/users/user`,
  });
  if (!error) {
    const { firstname, lastname } = response?.data.user;
    dispatch({
      type: actions.UPDATE_USER_DETAILS,
      payload: { firstname, lastname },
    });
  }
};
