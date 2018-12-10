import { all } from "redux-saga/effects";

import boardSagas from "containers/Board/sagas";

export default function* sprintDepsGraphSagas() {
  yield all([boardSagas()]);
}
