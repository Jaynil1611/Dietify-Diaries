import { createContext, useContext, useReducer } from "react";
import { videoReducer } from "../reducers";

const VideoContext = createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, {
    videoList: [],
    playlists: [],
    watchLater: [],
    history: [],
    likedVideos: [],
    dislikedVideos: [],
    savedVideos: [],
    search: "",
    tag: "",
  });

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
