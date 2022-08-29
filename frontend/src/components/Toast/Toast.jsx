import { actions } from "../../reducers";
import { useVideo } from "../../contexts";
import "./Toast.css";
import { useEffect } from "react";

export const handleToast = (dispatch, text, status) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: true, text, status },
  });
  setTimeout(() => closeToast(dispatch), 2000);
};

export const closeToast = (dispatch) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: false, text: "" },
  });
};

const Toast = () => {
  const {
    state: { showToast, toastMessage, toastStatus },
    dispatch,
  } = useVideo();

  useEffect(() => {
    return () => closeToast(dispatch);
  }, [dispatch]);

  return (
    <>
      {showToast && (
        <div className="toast toast--position text--white">
          <i className={`fas ${getIconFromStatus(toastStatus)} fa-lg`}></i>
          <span className="toast__content">{toastMessage}</span>
        </div>
      )}
    </>
  );
};

const getIconFromStatus = (status) => {
  switch (status) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-times-circle";
    case "warning":
      return "fa-exclamation-circle";
    case "info":
      return "fa-info-circle";
    default:
      return "fa-check-circle";
  }
};

export default Toast;
