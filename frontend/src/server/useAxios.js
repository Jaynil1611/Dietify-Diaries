import { useEffect, useState } from "react";
import { useVideo } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";
import { constructURL } from "./ServerUpdate";
import { checkAuthStatus } from "../utils";

export default function useAxios(resource, name, isAuthRequired) {
  const {
    state: { videoList },
    dispatch,
    token,
  } = useVideo();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (checkAuthStatus(token, isAuthRequired)) {
      if (videoList.length > 0 && !isAuthRequired) return;
      setLoadingStatus(true);
      (async () => {
        try {
          const {
            response: { data },
            error,
          } = await callMockServer({
            type: "get",
            url: `${constructURL()}/${resource}`,
          });
          if (!error) {
            dispatch({
              type: actions.INITIALIZE_LIST,
              payload: { name, data: data[resource] },
            });
          }
        } catch (error) {
          setError(true);
        } finally {
          setLoadingStatus(false);
        }
      })();
    }
  }, [dispatch, token]);

  return { loadingStatus, error };
}
