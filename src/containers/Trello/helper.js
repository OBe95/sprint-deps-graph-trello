import { put } from "redux-saga/effects";
import { resetTrelloToken } from "containers/Authorization/actions";

import { Trello, LOCAL_STORAGE_KEY } from "containers/Trello/constants";

export const setToken = token => {
  Trello.setToken(token);
};

export const getToken = () => Trello.token();

export const resetToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export function* errorHandler(error) {
  console.log(error.responseText);
  if (error.status === 401) {
    yield put(resetTrelloToken());
  }
  return [];
}
