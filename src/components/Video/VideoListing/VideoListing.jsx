import React from "react";
import "./VideoListing.css";
// import YouTube from "react-youtube";

const getDuration = (duration) => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;
  return `${hours > 0 ? hours.toString() + ":" : ""}${
    minutes > 0 ? minutes.toString() + ":" : ""
  }${seconds < 10 ? "0" + seconds.toString() : seconds}`;
};

// const opts = {
//   height: "390",
//   width: "640",
//   playerVars: {
//     modestbranding: 1,
//   },
// };

function VideoListing({ videoList }) {
  return (
    <div className="video-showcase">
      {videoList.map((video) => {
        const { id, channelTitle, duration, title, thumbnailUrl } = video;
        getDuration(duration);
        return (
          <div key={id} className="card--video">
            <div className="card__badge badge--position body--md">
              {getDuration(duration)}
            </div>
            {/* <YouTube videoId={id} opts={opts} className="img--responsive" /> */}
            <img
              className="img--responsive img--align"
              src={thumbnailUrl}
              alt=""
            />
            <div className="video--details">
              <img
                className="img--rounded img--vsm spacing--sm"
                src={`https://yt3.ggpht.com/ytc/AAUvwnjljnAGd_7gxeF5gJMR12-ZKEbhOJkXpggQp8_I7A=s100-c-k-c0x00ffffff-no-rj`}
                alt=""
              />
              <div className="spacing--sm">
                <p className="video--title subtitle--sm text--bold">{title}</p>
                <div className="card__content--align">
                  <p className="body--md">{channelTitle}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoListing;
