import { actions } from "../../reducers";
import { useVideo } from "../../contexts";
import "./Toast.css";

export const handleToast = (dispatch, text) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: true, text },
  });
  setTimeout(() => closeToast(dispatch), 1000);
};

const closeToast = (dispatch) => {
  dispatch({
    type: actions.OPEN_OR_CLOSE_TOAST,
    payload: { show: false, text: "" },
  });
};

const Toast = () => {
  const {
    state: { showToast, toastMessage },
  } = useVideo();

  return (
    <>
      {showToast && (
        <div className="toast toast--position text--white">
          <i className="fas fa-check-circle fa-lg"></i>
          <span className="toast__content">{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default Toast;
