import React from "react";
import { useVideo } from "../../contexts";
import { useDocumentTitle, useToastCleaner } from "../../utils";
import { VideoListing, PlayListHeading } from "../index";

function History() {
  const {
    state: { history },
  } = useVideo();
  useToastCleaner();
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
