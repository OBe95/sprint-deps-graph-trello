import { put, takeLatest, all } from "redux-saga/effects";

import { ASK_AUTHORIZATION } from "containers/Authorization/constants";
import { Trello, CONFIG } from "containers/Trello/constants";
import { getToken } from "containers/Trello/helper";

function askAuthorization() {
  Trello.authorize({
    ...CONFIG,
    success() {
      // TODO: show welcome toaster
      put(getToken());
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
