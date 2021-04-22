import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts";
import { getFilteredList } from "../../utils";
import "./PlayLists.css";

function Playlists() {
  const {
    state: { playlists, likedVideos, savedVideos },
  } = useVideo();
  const updatedPlaylists = getFilteredList(playlists);
  return (
    <>
      {updatedPlaylists.length === 0 && likedVideos.length === 0 ? (
        <div className="subtitle--md text--bold spacing">
          Loading Playlists...
        </div>
      ) : (
        <>
          <div className="subtitle--md text--bold spacing">Your Playlists</div>
          <div className="playlist__container">
            {updatedPlaylists.map((playlist) => {
              const { name, id, videoList } = playlist;
              return (
                <Link key={id} to={`${id}`}>
                  <PlayListView
                    name={name}
                    videoList={getFilteredList(videoList)}
                  />
                </Link>
              );
            })}
            <Link to="/liked">
              <PlayListView name={"Liked videos"} videoList={likedVideos} />
            </Link>
            <Link to="/saved">
              <PlayListView name={"Saved videos"} videoList={savedVideos} />
            </Link>
          </div>
        </>
      )}
    </>
  );
}

const PlayListView = ({ name, videoList }) => (
  <>
    {videoList.length > 0 ? (
      <div className="playlist--details">
        <div className="playlist__thumbnail">
          <img
            className="img--responsive"
            src={videoList[0].thumbnailUrl}
            alt=""
          />
          <div className="playlist--overlay">
            <div>{videoList.length}</div>
            <img
              className="img--xs"
              src="https://img.icons8.com/fluent-systems-filled/48/ffffff/video-playlist.png"
              alt=""
            />
          </div>
        </div>
        <div className="playlist__name">
          <p>{name}</p>
          <p className="text--gray body--md">{videoList.length} videos</p>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
);

export default Playlists;
