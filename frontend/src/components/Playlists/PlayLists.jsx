import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts";
import {
  getFilteredList,
  useDocumentTitle,
  useToastCleaner,
} from "../../utils";
import PlayListView from "./PlayListView";
import "./PlayLists.css";

function PlayLists() {
  const {
    state: { playlists, likedVideos, savedVideos },
  } = useVideo();
  useToastCleaner();
  useDocumentTitle("Playlists");
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

export default PlayLists;
