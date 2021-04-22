import React from "react";
import { useVideo } from "../../contexts";
import { VideoListing } from "../index";
import { PlayListHeading } from "../Playlists/PlaylistDetail/PlayListDetail";

function Like() {
  const {
    state: { likedVideos },
  } = useVideo();

  return (
    <div>
      <PlayListHeading
        name="Liked videos"
        length={likedVideos.length}
        type={"liked"}
      />
      <VideoListing videoList={likedVideos} type={"liked"} />
    </div>
  );
}

export default Like;
