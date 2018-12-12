import { put } from "redux-saga/effects";

import get from "lodash/get";

import { resetTrelloToken } from "containers/Authorization/actions";
import { setMessage } from "containers/Home/actions";
import { LOCAL_STORAGE_KEY } from "containers/Trello/constants";

export const setToken = token => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const resetToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getErrorMessage = error =>
  get(error, ["data", "data"]) || "An error occurred";

export function* errorHandler(error) {
  if (error.status === 401) {
    yield put(resetTrelloToken());
  }
  yield put(setMessage(getErrorMessage(error), "error"));
}
