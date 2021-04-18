import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import "./VideoDetail.css";
import { getPublishedDate } from "../../../utils";
import { callMockServer } from "../../../server";

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

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    modestbranding: 1,
  },
};

const VideoComponents = ({
  video: { tags, title, channelTitle, description, publishedAt, id },
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
      <div className="title text--bold subtitle--sm spacing--vh">{title}</div>
      <div className="video__actions">
        <div className="action__container">
          <i className=" far fa-thumbs-up icon fa-lg"></i>
          <p>Like</p>
        </div>
        <div className="action__container">
          <i className="far fa-thumbs-down icon fa-flip-horizontal  fa-lg"></i>
          <p>Dislike</p>
        </div>
        <div className="action__container">
          <i className="fas fa-folder-plus fa-lg"></i>
          <p>Add</p>
        </div>
        <div className="action__container">
          <i className="far fa-bookmark fa-lg"></i>
          <p>Save</p>
        </div>
        <div className="action__container">
          <i className="fas fa-share fa-lg"></i>
          <p>Share</p>
        </div>
      </div>
      <div className="video__channel">
        <img
          className="img--rounded img--vsm"
          src={`https://yt3.ggpht.com/ytc/AAUvwnjljnAGd_7gxeF5gJMR12-ZKEbhOJkXpggQp8_I7A=s100-c-k-c0x00ffffff-no-rj`}
          alt=""
        />
        <div className="title">{channelTitle}</div>
      </div>
      <div className="video__desc">
        <p>Published on {getPublishedDate(publishedAt)}</p>
        <div className="video__desc--content">{description}</div>
      </div>
    </div>
  </>
);

export default VideoDetail;
