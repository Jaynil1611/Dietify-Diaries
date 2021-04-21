import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts";
import "./PlayLists.css";

function PlayLists() {
  const {
    state: { playlists, likedVideos },
  } = useVideo();

  return (
    <>
      <div className="subtitle--md text--bold spacing"> Your Playlists </div>
      <div className="playlist__container">
        {playlists.map((playlist) => {
          const { name, id, videoList } = playlist;
          return (
            <Link key={id} to={`${id}`}>
              <PlayListView name={name} videoList={videoList} />
            </Link>
          );
        })}
        <Link to="/liked">
          <PlayListView name={"Liked videos"} videoList={likedVideos} />
        </Link>
      </div>
    </>
  );
}
    
const PlayListView = ({ name, videoList }) => (
  <div className="playlist--details">
    <div className="playlist__thumbnail">
      <img className="img--responsive" src={videoList[0].thumbnailUrl} alt="" />
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
);

export default PlayLists;
