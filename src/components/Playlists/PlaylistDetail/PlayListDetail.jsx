import React, { useEffect, useState } from "react";
import "./PlayListDetail.css";
import { VideoListing } from "../../index";
import { useParams } from "react-router";
import { callMockServer } from "../../../server";

function PlayListDetail() {
  const { playlistId } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState({});

  useEffect(() => {
    (async () => {
      const { response, error } = await callMockServer({
        type: "get",
        url: `/api/playlists/${playlistId}`,
      });
      if (!error) {
        setCurrentPlaylist(response.data.playlist);
      }
    })();
  }, []);

  return (
    <div>
      {checkPlaylist(currentPlaylist) && (
        <>
          <PlayListHeading
            name={currentPlaylist.name}
            length={currentPlaylist.videoList.length}
          />
          <VideoListing videoList={currentPlaylist.videoList} playlist={true} />
        </>
      )}
    </div>
  );
}

export const PlayListHeading = ({ name, length }) => {
  return (
    <>
      <div className="subtitle--md spacing--sm playlist__heading">
        <div>{name}</div>
        <div>
          <i className="fas fa-trash-alt fa-lg"></i>
        </div>
      </div>
      <div className="spacing--horiz body--md">{length} videos</div>
    </>
  );
};

const checkPlaylist = (playlist) => {
  return Object.keys(playlist).length > 0;
};

export default PlayListDetail;
