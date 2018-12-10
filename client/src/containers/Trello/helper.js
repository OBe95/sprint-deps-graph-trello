import { put } from "redux-saga/effects";
import { resetTrelloToken } from "containers/Authorization/actions";

import { LOCAL_STORAGE_KEY } from "containers/Trello/constants";

export const setToken = token => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const resetToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export function* errorHandler(error) {
  console.log("errorHandler", error.data);
  if (error.status === 401) {
    yield put(resetTrelloToken());
  }
  return [];
}
