import React from "react";
import "./VideoListing.css";
import { Link } from "react-router-dom";
import { getDuration, getPublishedDate } from "../../../utils";

function VideoListing({ videoList }) {
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
          <Link key={id} to={`${id}`}>
            <div className="card--video">
              <div className="card__badge badge--position body--md">
                {getDuration(duration)}
              </div>
              <img className="img--responsive" src={thumbnailUrl} alt="" />
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
                      <span>{getPublishedDate(publishedAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default VideoListing;
