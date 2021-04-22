import React from "react";
import { useVideo } from "../../contexts";
import { VideoListing, PlayListHeading } from "../index";

function History() {
  const {
    state: { history },
  } = useVideo();

  return (
    <div>
      {history ? (
        <>
          <PlayListHeading
            name="History"
            length={history.length}
            type={"history"}
          />
          <VideoListing videoList={history} type={"history"} />
        </>
      ) : (
        <div>History Loading</div>
      )}
    </div>
  );
}

export default History;
