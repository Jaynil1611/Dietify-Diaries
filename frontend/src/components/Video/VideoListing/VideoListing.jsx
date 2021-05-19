import React from "react";
import "./VideoListing.css";
import { Link } from "react-router-dom";
import { getDuration, getPublishDistance } from "../../../utils";
import { formatDistanceStrict } from "date-fns";
import {
  addOrRemoveVideoFromLiked,
  addOrRemoveVideoFromPlaylist,
  addOrRemoveVideoFromSaved,
} from "../../../server";
import { useVideo } from "../../../contexts";

function VideoListing({ videoList, playlist, type }) {
  const { dispatch } = useVideo();

  return (
    <div className="video-showcase">
      {videoList.map((video) => {
        const {
          id,
          channelTitle,
          duration,
          title,
          publishedAt,
          thumbnailUrl,
        } = video;
        getDuration(duration);
        return (
          <div key={id} className="video__wrapper">
            <Link to={`/videos/${id}`}>
              <div className="card--video">
                <div className="card__badge badge--position body--md">
                  {getDuration(duration)}
                </div>
                <div className="video__thumbnail">
                  <img className="img--responsive" src={thumbnailUrl} alt="" />
                </div>
                <div className="video__captions">
                  <img
                    className="img--rounded img--msm spacing--sm"
                    src={`https://yt3.ggpht.com/ytc/AAUvwnjljnAGd_7gxeF5gJMR12-ZKEbhOJkXpggQp8_I7A=s100-c-k-c0x00ffffff-no-rj`}
                    alt=""
                  />
                  <div className="spacing--sm">
                    <p className="video__title subtitle--sm text--bold">
                      {title}
                    </p>
                    <div className="card__content--align">
                      <p className="body--md video__date">
                        {channelTitle}
                        <span>
                          {getPublishDistance(
                            formatDistanceStrict,
                            publishedAt
                          )}{" "}
                          ago
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className={getTypeClass(type)}>
              <i
                onClick={() =>
                  clickHandler({ dispatch, playlist, video, videoList, type })
                }
                className="fas fa-times fa-lg"
              ></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const getTypeClass = (type) => {
  return `${
    type && type !== "history" ? "badge__icon badge__icon--align" : "hide"
  }`;
};

const clickHandler = ({ dispatch, playlist, video, videoList, type }) => {
  switch (type) {
    case "playlist":
      return addOrRemoveVideoFromPlaylist(dispatch, playlist, video);
    case "liked":
      return addOrRemoveVideoFromLiked(dispatch, videoList, video);
    case "saved":
      return addOrRemoveVideoFromSaved(dispatch, videoList, video);
    default:
      return;
  }
};

export default VideoListing;
