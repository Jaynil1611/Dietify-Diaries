import React from "react";
import "./PlayListDetail.css";
import { VideoListing } from "../../index";
import { useNavigate, useParams } from "react-router";
import { getFilteredList, getListDetails } from "../../../utils";
import { useVideo } from "../../../contexts";
import { removePlaylist } from "../../../server";

function PlayListDetail() {
  const {
    state: { playlists },
    dispatch,
  } = useVideo();
  const { playlistId } = useParams();

  const currentPlaylist = getListDetails(playlists, playlistId);
  const filteredVideoList = currentPlaylist
    ? getFilteredList(currentPlaylist?.videoList)
    : [];

  return (
    <div>
      {currentPlaylist ? (
        <>
          <PlayListHeading
            name={currentPlaylist.name}
            dispatch={dispatch}
            type={"playlist"}
            length={filteredVideoList.length}
            playlist={currentPlaylist}
          />
          <VideoListing
            videoList={filteredVideoList}
            playlist={currentPlaylist}
            type={"playlist"}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export const PlayListHeading = ({ name, length, playlist, dispatch, type }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="subtitle--md spacing--sm playlist__heading">
        <div>{name}</div>
        <div className={`${type === "playlist" ? "spacing--horiz" : "hide"}`}>
          <i
            onClick={() => {
              removePlaylist(dispatch, playlist);
              navigate("/playlists");
            }}
            className="fas fa-trash-alt fa-md"
          ></i>
        </div>
      </div>
      <div className="spacing--horiz body--md">{length} videos</div>
    </>
  );
};

export default PlayListDetail;
