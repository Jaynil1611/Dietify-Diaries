import { callMockServer } from ".";
import { actions } from "../reducers";
import { checkVideoExists } from "../utils";
import faker from "faker";

// -------------------- Liked Server Updates ---------------------------------------------
const getRequestObject = (itemExists, video) => {
  return itemExists
    ? {
        type: "put",
        url: `/api/likes/${video.id}`,
        data: { like: { ...video, status: "deleted" } },
      }
    : {
        type: "post",
        url: "/api/likes",
        data: { like: video },
      };
};

const addOrRemoveVideoFromLiked = async (dispatch, list, video) => {
  const itemExists = checkVideoExists(list, video.id);
  const { response, error } = await callMockServer(
    getRequestObject(itemExists, video)
  );
  if (!error) {
    const { like: videoResponse } = response.data;
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
  itemExists
    ? dispatch({
        type: actions.REMOVE_FROM_DISLIKED_LIST,
        payload: { id: video.id },
      })
    : dispatch({ type: actions.ADD_TO_DISLIKED_LIST, payload: video });
};

// -------------------- Playlist Server Updates ---------------------------------------------
const getRequestObjectForPlaylist = (itemExists, playlist, video) => {
  if (itemExists) {
    return {
      type: "put",
      url: `/api/playlists/${playlist.id}`,
      data: {
        playlist: {
          ...playlist,
          videoList: getUpdatedVideoListForPlaylist(playlist, video),
        },
      },
    };
  }
  return {
    type: "post",
    url: "/api/playlists",
    data: {
      playlist: {
        ...playlist,
        videoList: playlist.videoList.concat(video),
      },
    },
  };
};

const getUpdatedVideoListForPlaylist = (playlist, videoToBeDeleted) => {
  return playlist.videoList.map((video) => {
    return video.id === videoToBeDeleted.id
      ? { ...video, status: "deleted" }
      : video;
  });
};

const addOrRemoveVideoFromPlaylist = async (dispatch, playlist, video) => {
  const itemExists = checkVideoExists(playlist.videoList, video.id);
  const { response, error } = await callMockServer(
    getRequestObjectForPlaylist(itemExists, playlist, video)
  );
  if (!error) {
    const { playlist: playlistResponse } = response.data;
    itemExists
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
    url: "/api/playlists",
    data: {
      playlist: {
        id: faker.datatype.uuid(),
        name,
        videoList: [],
      },
    },
  });
  if (!error) {
    dispatch({
      type: actions.ADD_NEW_PLAYLIST,
      payload: response.data.playlist,
    });
  }
};

const removePlaylist = async (dispatch, playlist) => {
  const { response, error } = await callMockServer({
    type: "put",
    url: `/api/playlists/${playlist.id}`,
    data: { playlist: { ...playlist, status: "deleted" } },
  });
  if (!error) {
    dispatch({
      type: actions.REMOVE_PLAYLIST,
      payload: response.data.playlist,
    });
  }
};

export {
  addOrRemoveVideoFromLiked,
  addOrRemoveVideoFromDisliked,
  addOrRemoveVideoFromPlaylist,
  addPlaylist,
  removePlaylist,
};
