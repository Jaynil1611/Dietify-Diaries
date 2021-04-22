import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import "./VideoDetail.css";
import { getPublishedDate, checkVideoExists } from "../../../utils";
import {
  addOrRemoveVideoFromPlaylist,
  callMockServer,
  addOrRemoveVideoFromLiked,
  addOrRemoveVideoFromDisliked,
} from "../../../server";
import Linkify from "linkifyjs/react";
import { useVideo } from "../../../contexts";
import { actions } from "../../../reducers";

function VideoDetail() {
  const { videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState({});
  useEffect(() => {
    (async () => {
      const { response, error } = await callMockServer({
        type: "get",
        url: `/api/videos/${videoId}`,
      });
      if (!error) {
        setCurrentVideo(response.data.video);
      }
    })();
  }, []);

  return (
    <div>
      <VideoComponents video={currentVideo} />
    </div>
  );
}

const VideoComponents = ({ video }) => {
  const {
    state: { likedVideos, dislikedVideos, playlists },
    dispatch,
  } = useVideo();
  const { tags, title, channelTitle, description, publishedAt, id } = video;
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleShowPlaylist = () => setShowPlaylist(!showPlaylist);
  const closePlaylist = () => setShowPlaylist(false);

  const addNewPlaylistOption = (e) => {
    e.preventDefault();
    dispatch({
      type: actions.ADD_NEW_PLAYLIST,
      payload: { name: e.target.form[0].value },
    });
    e.target.form.reset();
  };

  return (
    <>
      <div className="video__container">
        <YouTube className="video__player" videoId={id} opts={opts} />
      </div>
      <div className="video__detail">
        <ul className="list--inline li__wrapper">
          {tags?.slice(0, 2).map((tag) => (
            <li key={tag} className="li__tag body--md">
              #{tag}
            </li>
          ))}
        </ul>
        <div className="spacing--sm">
          <p className="title text--bold subtitle--sm">{title}</p>
        </div>
        <div className="video__actions">
          <div className="action__container">
            <OutlineButton
              onClick={() =>
                addOrRemoveVideoFromLiked(dispatch, likedVideos, video)
              }
            >
              <i
                className={`fa${
                  checkVideoExists(likedVideos, id) ? "s liked" : "r"
                } fa-thumbs-up icon fa-lg                   
                `}
              ></i>
            </OutlineButton>
            <p className="spacing--vh">Like</p>
          </div>
          <div className="action__container">
            <OutlineButton
              onClick={() =>
                addOrRemoveVideoFromDisliked(dispatch, dislikedVideos, video)
              }
            >
              <i
                className={`fa${
                  checkVideoExists(dislikedVideos, id) ? "s liked" : "r"
                } fa-thumbs-down icon fa-flip-horizontal fa-lg`}
              ></i>
            </OutlineButton>
            <p className="spacing--vh">Dislike</p>
          </div>
          <div className="action__container">
            <OutlineButton onClick={handleShowPlaylist}>
              <i className="far fa-plus-square fa-lg"></i>
            </OutlineButton>
            <p className="spacing--vh">Add</p>
          </div>
          <div
            onClick={closePlaylist}
            className={`${showPlaylist ? "playlist__modal" : "hide"}`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="playlists__showcase"
            >
              <div className="modal__heading subtitle--md text--bold spacing--hz">
                <p>Add to Playlist</p>
                <div className="badge__icon badge__icon--align">
                  <OutlineButton onClick={closePlaylist}>
                    <i className="fas fa-times fa-lg"></i>
                  </OutlineButton>
                </div>
              </div>
              {playlists.map((playlist) => {
                const { name, id, videoList } = playlist;
                return (
                  <div key={id} className="playlist__input spacing--hz">
                    <input
                      type="checkbox"
                      defaultChecked={checkVideoExists(videoList, video.id)}
                      onChange={() =>
                        addOrRemoveVideoFromPlaylist(dispatch, playlist, video)
                      }
                    />
                    <p className="spacing--horiz">{name}</p>
                  </div>
                );
              })}
              <form className="playlist__add spacing--hz">
                <input
                  className="input"
                  type="text"
                  placeholder="New playlist "
                  required
                />
                <OutlineButton
                  className="padding--sm"
                  onClick={addNewPlaylistOption}
                >
                  ADD
                </OutlineButton>
              </form>
            </div>
          </div>
          {/* dispatch({type:actions.ADD_NEW_PLAYLIST,payload:{name:}}) */}
          <div className="action__container">
            <OutlineButton>
              <i className="far fa-bookmark fa-lg"></i>
            </OutlineButton>
            <p className="spacing--vh">Save</p>
          </div>
          <div className="action__container">
            <OutlineButton>
              <i className="far fa-share fa-lg"></i>
            </OutlineButton>
            <p className="spacing--vh">Share</p>
          </div>
        </div>
        <div className="video__channel">
          <img
            className="img--rounded img--vsm"
            src={`https://yt3.ggpht.com/ytc/AAUvwnjljnAGd_7gxeF5gJMR12-ZKEbhOJkXpggQp8_I7A=s100-c-k-c0x00ffffff-no-rj`}
            alt=""
          />
          <div className="title spacing--sm">{channelTitle}</div>
        </div>
        <div className="video__desc body--md">
          <p>Published on {getPublishedDate(publishedAt)}</p>
          <div className="video__desc--content">
            <Linkify>{description}</Linkify>
          </div>
        </div>
      </div>
    </>
  );
};

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    modestbranding: 1,
  },
};

const OutlineButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`button button--outline-v2 ${className}`}
  >
    {children}
  </button>
);

export default VideoDetail;
