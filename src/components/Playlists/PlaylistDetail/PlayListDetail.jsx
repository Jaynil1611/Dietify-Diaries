import React from "react";
import "./PlayListDetail.css";
import { VideoListing } from "../../index";
import { useParams } from "react-router";
import {
  getFilteredList,
  getListDetails,
  useDocumentTitle,
} from "../../../utils";
import { useVideo } from "../../../contexts";
import PlayListHeading from "./PlayListHeading";

function PlayListDetail() {
  const {
    state: { playlists },
    dispatch,
  } = useVideo();
  const { playlistId } = useParams();
  useDocumentTitle("PlaylistDetail");
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

export default PlayListDetail;
