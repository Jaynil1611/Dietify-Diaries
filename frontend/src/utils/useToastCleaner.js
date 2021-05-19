import { useEffect } from "react";
import { closeToast } from "../components";
import { useVideo } from "../contexts";

export default function useToastCleaner() {
  const { dispatch } = useVideo();

  useEffect(() => {
    closeToast(dispatch);
  }, []);
}
