import {
  SET_TRELLO_TOKEN,
  RESET_TRELLO_TOKEN
} from "containers/Authorization/constants";
import { setToken } from "constants/Trello";

const initialState = { trelloToken: null };

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRELLO_TOKEN:
      setToken(action.token);
      return { ...state, trelloToken: action.token };
    case RESET_TRELLO_TOKEN:
      return { ...state, trelloToken: null };
    default:
      return state;
  }
};

export default { authorizationReducer };
