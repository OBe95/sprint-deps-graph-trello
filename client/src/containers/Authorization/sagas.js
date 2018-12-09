import { put, takeLatest, all } from "redux-saga/effects";

import { ASK_AUTHORIZATION } from "containers/Authorization/constants";
import { Trello, CONFIG } from "containers/Trello/constants";
import { getToken } from "containers/Trello/helper";
import { setTrelloToken } from "containers/Authorization/actions";

function* askAuthorization() {
  const token = yield new Promise((resolve, reject) => {
    Trello.authorize({
      ...CONFIG,
      success() {
        resolve(getToken());
      },
      error(err) {
        reject(err);
      }
    });
  })
    .then(_token => _token)
    .catch(_error => {
      // TODO: show error toaster
      console.error("askAuthorization", _error);
      return null;
    });

  if (token) {
    // TODO: show welcome toaster
    yield put(setTrelloToken(getToken()));
  }
}
function* askAuthorizationSaga() {
  yield takeLatest(ASK_AUTHORIZATION, askAuthorization);
}

export default function* authorizationSagas() {
  yield all([askAuthorizationSaga()]);
}
