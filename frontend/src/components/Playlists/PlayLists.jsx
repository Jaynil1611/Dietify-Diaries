import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts";
import { getFilteredList, useDocumentTitle } from "../../utils";
import { PlayListView } from "../index";
import "./PlayLists.css";

function PlayLists({ loading }) {
  const {
    state: { playlists, likedVideos, savedVideos },
  } = useVideo();
  useDocumentTitle("Playlists");

  const checkEmptyPlaylists = () => {
    return playlists.length || likedVideos.length || savedVideos.length
      ? false
      : true;
  };

  return (
    <>
      {loading ? (
        <span className="loading"></span>
      ) : (
        <>
          <div className="subtitle--md text--bold spacing">Your Playlists</div>
          <div className="playlist__container">
            {checkEmptyPlaylists() && (
              <div className="subtitle--md spacing text--gray">
                Your playlists are empty
              </div>
            )}
            {getFilteredList(playlists).map((playlist) => {
              const { name, id, videoList } = playlist;
              return (
                <Link key={id} to={`${id}`}>
                  {videoList.length > 0 && (
                    <PlayListView name={name} videoList={videoList} />
                  )}
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
