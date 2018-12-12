import { SET_MESSAGE, RESET_MESSAGE } from "containers/Home/constants";

const initialState = { messageContent: null, messageType: null };

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE: {
      const { messageContent, messageType } = action;
      return { ...state, messageContent, messageType };
    }
    case RESET_MESSAGE:
      return { ...state, messageContent: null, messageType: null };
    default:
      return state;
  }
};

export default { homeReducer };
