import { useEffect } from "react";
import { useLocation } from "react-router";
import { closeToast } from "../components";
import { useVideo } from "../contexts";

export default function useCleaner() {
  const { dispatch } = useVideo();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || pathname !== "signup") closeToast(dispatch);
  }, [dispatch, pathname]);
}
