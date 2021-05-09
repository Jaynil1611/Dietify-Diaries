import { createContext, useContext, useReducer } from "react";
import { videoReducer } from "../reducers";
import { initialState } from "./initialState";

const VideoContext = createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
