import { all } from "redux-saga/effects";

import authorizationSagas from "containers/Authorization/sagas";
import boardSagas from "containers/Board/sagas";

export default function* trelloDepsGraphSagas() {
  yield all([boardSagas(), authorizationSagas()]);
}
