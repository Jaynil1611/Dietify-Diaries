import { checkVideoExists } from "../../../utils";
import {
  addOrRemoveVideoFromLiked,
  addOrRemoveVideoFromDisliked,
  addOrRemoveVideoFromSaved,
} from "../../../server";

const LikeAction = ({ dispatch, likedVideos, video, id }) => (
  <div className="action__container">
    <OutlineButton
      onClick={() => addOrRemoveVideoFromLiked(dispatch, likedVideos, video)}
    >
      <i
        className={`fa${
          checkVideoExists(likedVideos, id) ? "s liked" : "r"
        } fa-thumbs-up icon fa-lg                   
        `}
      ></i>
    </OutlineButton>
    <p className="spacing--vh">Like</p>
  </div>
);

const DislikeAction = ({ dispatch, dislikedVideos, video, id }) => (
  <div className="action__container">
    <OutlineButton
      onClick={() =>
        addOrRemoveVideoFromDisliked(dispatch, dislikedVideos, video)
      }
    >
      <i
        className={`fa${
          checkVideoExists(dislikedVideos, id) ? "s liked" : "r"
        } fa-thumbs-down icon fa-flip-horizontal fa-lg`}
      ></i>
    </OutlineButton>
    <p className="spacing--vh">Dislike</p>
  </div>
);

const AddToPlaylistAction = ({ handleShowPlaylist }) => (
  <div className="action__container">
    <OutlineButton onClick={handleShowPlaylist}>
      <i className="far fa-plus-square fa-lg"></i>
    </OutlineButton>
    <p className="spacing--vh">Add</p>
  </div>
);

const SaveAction = ({ dispatch, savedVideos, video, id }) => (
  <div className="action__container">
    <OutlineButton
      onClick={() => addOrRemoveVideoFromSaved(dispatch, savedVideos, video)}
    >
      <i
        className={`fa${
          checkVideoExists(savedVideos, id) ? "s" : "r"
        } fa-bookmark fa-lg`}
      ></i>
    </OutlineButton>
    <p className="spacing--vh">Save</p>
  </div>
);

const ShareAction = ({ id }) => (
  <div className="action__container">
    <OutlineButton
      onClick={() =>
        navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${id}`)
      }
    >
      <i className="far fa-share fa-lg"></i>
    </OutlineButton>
    <p className="spacing--vh">Share</p>
  </div>
);

const OutlineButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`button button--outline-v2 ${className}`}
  >
    {children}
  </button>
);

export {
  OutlineButton,
  LikeAction,
  DislikeAction,
  AddToPlaylistAction,
  SaveAction,
  ShareAction,
};
