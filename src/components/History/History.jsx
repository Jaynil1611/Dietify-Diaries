import React from "react";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import { VideoListing, PlayListHeading } from "../index";

function History() {
  const {
    state: { history },
  } = useVideo();
  useDocumentTitle("History");

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
