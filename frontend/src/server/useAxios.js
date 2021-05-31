import { useEffect, useState } from "react";
import { useVideo } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";
import { constructURL } from "./ServerUpdate";

export default function useAxios(resource, name) {
  const { dispatch, token } = useVideo();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (token) {
      setLoadingStatus(true);
      (async () => {
        try {
          const {
            response: { data },
            error,
          } = await callMockServer({
            type: "get",
            url: constructURL(resource),
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
  }, [dispatch, name, resource, token]);

  return { loadingStatus, error };
}
