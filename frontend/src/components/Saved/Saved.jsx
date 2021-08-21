import React from "react";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import { VideoListing, PlayListHeading } from "../index";

function Saved() {
  const {
    state: { savedVideos },
  } = useVideo();
  useDocumentTitle("Saved");

  return (
    <div>
      {savedVideos ? (
        <>
          <PlayListHeading
            name="Saved videos"
            length={savedVideos.length}
            type={"saved"}
          />
          <VideoListing videoList={savedVideos} type={"saved"} />
        </>
      ) : (
        <div>Saved Videos Loading</div>
      )}
    </div>
  );
}

export default Saved;
