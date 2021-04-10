import { actions } from "./Actions";

const videoReducer = (prevState, { type, payload }) => {
  switch (type) {
    case actions.INITIALIZE_LIST:
      return {
        ...prevState,
        [payload.name]: payload.data,
      };
    default:
      return prevState;
  }
};

export default videoReducer;
