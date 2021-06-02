import React from "react";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import { VideoListing, PlayListHeading } from "../index";

function History({ loading }) {
  const {
    state: { history },
  } = useVideo();
  useDocumentTitle("History");

  return (
    <div>
      {loading ? (
        <span className="loading"></span>
      ) : (
        <>
          <PlayListHeading
            name="History"
            length={history.length}
            type={"history"}
          />
          <VideoListing videoList={history} type={"history"} />
        </>
      )}
    </div>
  );
}

export default History;
