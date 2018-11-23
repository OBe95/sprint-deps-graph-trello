import {
  SET_TRELLO_TOKEN,
  RESET_TRELLO_TOKEN
} from "containers/Authorization/constants";

export const setTrelloToken = token => ({
  type: SET_TRELLO_TOKEN,
  token
});

export const resetTrelloToken = () => ({
  type: RESET_TRELLO_TOKEN
});
