import { SET_TRELLO_TOKEN, RESET_TRELLO_TOKEN } from './constants';

export const setTrelloToken = (token) => {
  return {
    type: SET_TRELLO_TOKEN,
    token,
  }
};

export const resetTrelloToken = () => {
  return {
    type: RESET_TRELLO_TOKEN,
  }
};