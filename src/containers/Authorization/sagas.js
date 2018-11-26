import { put, takeLatest, all } from "redux-saga/effects";

import { ASK_AUTHORIZATION } from "containers/Authorization/constants";
import { setTrelloToken } from "containers/Authorization/actions";
import { Trello, LOCAL_STORAGE_KEY, CONFIG } from "constants/Trello";

function askAuthorization() {
  Trello.authorize({
    ...CONFIG,
    success() {
      // TODO: show welcome toaster
      put(setTrelloToken(localStorage.getItem(LOCAL_STORAGE_KEY)));
    },
    error() {
      // TODO: show error toaster
    }
  });
}
function* askAuthorizationSaga() {
  yield takeLatest(ASK_AUTHORIZATION, askAuthorization);
}

export default function* authorizationSagas() {
  yield all([askAuthorizationSaga()]);
}
