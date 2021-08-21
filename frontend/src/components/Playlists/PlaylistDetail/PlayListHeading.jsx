import { useNavigate } from "react-router";
import { removePlaylist } from "../../../server";

const PlayListHeading = ({ name, length, playlist, dispatch, type }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="subtitle--md spacing--sm playlist__heading">
        <div>{name}</div>
        <div
          className={`${
            type === "playlist" ? "spacing--horiz pointer" : "hide"
          }`}
        >
          <i
            onClick={() => {
              removePlaylist(dispatch, playlist);
              navigate("/playlists");
            }}
            className="fas fa-trash-alt fa-md"
          ></i>
        </div>
      </div>
      <div className="spacing--horiz body--md">{length} videos</div>
    </>
  );
};

export default PlayListHeading;
