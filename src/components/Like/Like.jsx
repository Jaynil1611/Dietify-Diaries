import React from "react";
import { useVideo } from "../../contexts";
import { VideoListing, PlayListHeading } from "../index";

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
