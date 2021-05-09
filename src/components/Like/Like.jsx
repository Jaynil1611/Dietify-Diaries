import React from "react";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import { VideoListing, PlayListHeading } from "../index";

function Like() {
  const {
    state: { likedVideos },
  } = useVideo();
  useDocumentTitle("Liked");
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
