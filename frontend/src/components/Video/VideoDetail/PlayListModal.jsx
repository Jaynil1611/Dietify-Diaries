import { checkVideoExists } from "../../../utils";
import { addOrRemoveVideoFromPlaylist } from "../../../server";
import { OutlineButton } from "./VideoActions";

const PlayListModal = ({
  closePlaylist,
  showPlaylist,
  playlists,
  video,
  dispatch,
  addNewPlaylistOption,
}) => (
  <div
    onClick={closePlaylist}
    className={`${showPlaylist ? "playlist__modal" : "hide"}`}
  >
    <div onClick={(e) => e.stopPropagation()} className="playlists__showcase">
      <div className="modal__heading subtitle--md text--bold spacing--hz">
        <p>Add to Playlist</p>
        <div className="badge__icon badge__icon--align">
          <OutlineButton onClick={closePlaylist}>
            <i className="fas fa-times fa-lg"></i>
          </OutlineButton>
        </div>
      </div>
      {playlists.map((playlist) => {
        const { name, id, videoList } = playlist;
        return (
          <div key={id} className="playlist__input spacing--hz">
            <input
              type="checkbox"
              defaultChecked={checkVideoExists(videoList, video.id)}
              onChange={() =>
                addOrRemoveVideoFromPlaylist(dispatch, playlist, video)
              }
            />
            <p className="spacing--horiz">{name}</p>
          </div>
        );
      })}
      <form className="playlist__add spacing--hz">
        <input
          className="input"
          type="text"
          placeholder="New playlist "
          required
        />
        <OutlineButton className="padding--sm" onClick={addNewPlaylistOption}>
          ADD
        </OutlineButton>
      </form>
    </div>
  </div>
);

export default PlayListModal;
