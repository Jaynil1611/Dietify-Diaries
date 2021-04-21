import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import "./VideoDetail.css";
import { getPublishedDate } from "../../../utils";
import { callMockServer } from "../../../server";
import Linkify from "linkifyjs/react";

function VideoDetail() {
  const { videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState({});
  const [showPlaylist, setShowPlaylist] = useState(false);

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

  const handleShowPlaylist = () => setShowPlaylist(!showPlaylist);
  const closePlaylist = () => setShowPlaylist(false);
  return (
    <div>
      <VideoComponents
        showPlaylist={showPlaylist}
        handleShowPlaylist={handleShowPlaylist}
        video={currentVideo}
        closePlaylist={closePlaylist}
      />
    </div>
  );
}

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    modestbranding: 1,
  },
};

const playlists = [
  { name: "Asdadasd" },
  { name: "Asdasdasd" },
  { name: "Adsadsads" },
  { name: "ADSAFASFasd" },
];

const VideoComponents = ({
  video: { tags, title, channelTitle, description, publishedAt, id },
  handleShowPlaylist,
  showPlaylist,
  closePlaylist,
}) => (
  <>
    <div className="video__container">
      <YouTube className="video__player" videoId={id} opts={opts} />
    </div>
    <div className="video__detail">
      <ul className="list--inline li__wrapper">
        {tags?.slice(0, 2).map((tag) => (
          <li key={tag} className="li__tag">
            #{tag}
          </li>
        ))}
      </ul>
      <div className="spacing--hz">
        <p className="title text--bold subtitle--sm">{title}</p>
      </div>
      <div className="video__actions">
        <div className="action__container">
          <OutlineButton>
            <i className="far fa-thumbs-up icon fa-lg"></i>
          </OutlineButton>
          <p className="spacing--vh">Like</p>
        </div>
        <div className="action__container">
          <OutlineButton>
            <i className="far fa-thumbs-down icon fa-flip-horizontal  fa-lg"></i>
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
                <OutlineButton>
                  <i className="fas fa-times fa-lg"></i>
                </OutlineButton>
              </div>
            </div>
            {playlists.map(({ name }, index) => {
              return (
                <div key={index} className="playlist__input spacing--hz">
                  <input type="checkbox" />
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
              <OutlineButton className="padding--sm">ADD</OutlineButton>
            </form>
          </div>
        </div>
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

const OutlineButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`button button--outline button--outline-v2 ${className}`}
  >
    {children}
  </button>
);

export default VideoDetail;
