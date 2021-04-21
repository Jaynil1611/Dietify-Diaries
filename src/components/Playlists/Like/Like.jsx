import React from "react";
import { useVideo } from "../../../contexts";
import { VideoListing } from "../../index";
import { PlayListHeading } from "../PlaylistDetail/PlayListDetail";

function Like() {
  const {
    state: { likedVideos },
  } = useVideo();

  return (
    <div>
      <PlayListHeading name="Liked videos" length={likedVideos.length} />
      <VideoListing videoList={likedVideos} playlist={true} />
    </div>
  );
}

export default Like;
