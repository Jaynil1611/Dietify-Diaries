import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import "./VideoDetail.css";
import {
  getPublishedDate,
  useDocumentTitle,
  getVideoFromList,
} from "../../../utils";
import { addPlaylist, addVideoToHistory } from "../../../server";
import Linkify from "linkifyjs/react";
import { useVideo } from "../../../contexts";
import {
  LikeAction,
  DislikeAction,
  AddToPlaylistAction,
  SaveAction,
  ShareAction,
} from "./VideoActions";
import { PlayListModal } from "../../index";

function VideoDetail() {
  const { videoId } = useParams();
  const { state, dispatch } = useVideo();
  const { videoList } = state;
  const [currentVideo, setCurrentVideo] = useState({});
  useDocumentTitle("VideoDetail");

  useEffect(() => {
    if (videoList.length > 0) {
      const video = getVideoFromList(videoList, videoId);
      setCurrentVideo(video);
    }
  }, [videoList, videoId]);

  return (
    <div>
      <VideoComponents video={currentVideo} state={state} dispatch={dispatch} />
    </div>
  );
}

const VideoComponents = ({ video, state, dispatch }) => {
  const { likedVideos, dislikedVideos, playlists, savedVideos, history } =
    state;
  const { tags, title, channelTitle, description, publishedAt, id } = video;
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleShowPlaylist = () => setShowPlaylist(!showPlaylist);
  const closePlaylist = () => setShowPlaylist(false);

  const addNewPlaylistOption = (e) => {
    e.preventDefault();
    const value = e.target.form[0].value;
    value
      ? addPlaylist(dispatch, value)
      : alert("Playlist name cannot be empty");
    e.target.form.reset();
  };

  return (
    <>
      <div className="video__container">
        <YouTube
          className="video__player"
          opts={opts}
          onPlay={() => addVideoToHistory(dispatch, history, video)}
          videoId={id}
        />
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
          <LikeAction
            dispatch={dispatch}
            likedVideos={likedVideos}
            video={video}
            id={id}
          />
          <DislikeAction
            dispatch={dispatch}
            dislikedVideos={dislikedVideos}
            video={video}
            id={id}
          />
          <AddToPlaylistAction handleShowPlaylist={handleShowPlaylist} />
          <PlayListModal
            dispatch={dispatch}
            addNewPlaylistOption={addNewPlaylistOption}
            closePlaylist={closePlaylist}
            showPlaylist={showPlaylist}
            playlists={playlists}
            video={video}
          />
          <SaveAction
            dispatch={dispatch}
            savedVideos={savedVideos}
            id={id}
            video={video}
          />
          <ShareAction id={id} />
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
  playerVars: {
    // autoplay: 1,
    modestbranding: 1,
  },
};

export default VideoDetail;
