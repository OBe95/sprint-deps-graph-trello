import { put, takeLatest, all } from "redux-saga/effects";

import { FETCH_BOARDS, FETCH_LABELS } from "containers/Board/constants";
import { setBoards, setLabels } from "containers/Board/actions";
import { Trello, API_URLS } from "containers/Trello/constants";
import { errorHandler } from "containers/Trello/helper";

function* fetchBoards() {
  let error = null;
  const boards = yield Trello.get(API_URLS.BOARDS)
    .then(_boards => _boards)
    .catch(_error => {
      error = _error;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  yield put(setBoards(boards));
}
function* fetchBoardsSaga() {
  yield takeLatest(FETCH_BOARDS, fetchBoards);
}

function* fetchLabels(action) {
  let error = null;
  const labels = yield Trello.get(API_URLS.labels(action.boardId))
    .then(_labels => _labels)
    .catch(_error => {
      error = _error;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  yield put(setLabels(labels));
}
function* fetchLabelsSaga() {
  yield takeLatest(FETCH_LABELS, fetchLabels);
}

export default function* boardSagas() {
  yield all([fetchBoardsSaga(), fetchLabelsSaga()]);
}
