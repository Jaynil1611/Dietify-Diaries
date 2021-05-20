import { useEffect, useState } from "react";
import { useVideo } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";

const userId = "60a35a72ffb1fa01498940eb";

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
  }, []);

  return { loadingStatus, error };
}

const constructURL = (resource) => {
  if (resource === "videos") {
    return `${process.env.REACT_APP_BACKEND_URL}/${resource}`;
  }
  return `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/${resource}`;
};
