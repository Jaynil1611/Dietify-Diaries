import { useEffect, useState } from "react";
import { useVideo } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";

export default function useAxios(resource, name) {
  const { dispatch } = useVideo();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoadingStatus(true);
    (async () => {
      try {
        const {
          response: { data },
          error,
        } = await callMockServer({
          type: "get",
          url: `/api/${resource}`,
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
  }, []);

  return { loadingStatus, error };
}