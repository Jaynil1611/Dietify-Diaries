import { createContext, useContext, useReducer, useState } from "react";
import { videoReducer, actions } from "../reducers";
import { callMockServer } from "../server";
import { initialState } from "./initialState";
import { constructURL } from "../server";
import { setupAuthHeaderForServerCalls } from "../utils";
import { handleToast } from "../components";

const VideoContext = createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const savedToken = localStorage.getItem("isUserLoggedIn");
  const [token, setToken] = useState(
    savedToken ? JSON.parse(savedToken) : null
  );

  const loginUser = async (email, password) => {
    const { response, error } = await callMockServer({
      type: "post",
      url: `${constructURL()}/login`,
      data: { email, password },
    });
    if (!error) {
      const responseToken = response?.data.token;
      setToken(responseToken);
      setupAuthHeaderForServerCalls(responseToken);
      localStorage.setItem("isUserLoggedIn", JSON.stringify(responseToken));
      const { firstname, lastname } = response?.data;
      dispatch({
        type: actions.UPDATE_USER_DETAILS,
        payload: { firstname, lastname },
      });
      handleToast(dispatch, "Login successful");
      return true;
    }
    handleToast(dispatch, "Email or password is incorrect");
    return false;
  };

  const logoutUser = () => {
    setToken(null);
    setupAuthHeaderForServerCalls(null);
    localStorage.removeItem("isUserLoggedIn");
    handleToast(dispatch, "Logout successful");
  };

  return (
    <VideoContext.Provider
      value={{ state, dispatch, loginUser, logoutUser, token }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
