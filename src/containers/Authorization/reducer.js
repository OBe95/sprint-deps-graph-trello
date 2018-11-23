import { SET_TRELLO_TOKEN, RESET_TRELLO_TOKEN } from "./constants";

const initialState = { trelloToken: null };

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRELLO_TOKEN:
      return { ...state, trelloToken: action.token };
    case RESET_TRELLO_TOKEN:
      return { ...state, trelloToken: null };
    default:
      return state;
  }
};