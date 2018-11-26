import { put, takeLatest, all } from "redux-saga/effects";

import { FETCH_BOARDS, FETCH_LABELS } from "containers/Board/constants";
import { setBoards, setLabels } from "containers/Board/actions";
import { Trello, APIS } from "constants/Trello";

function* fetchBoards() {
  const boards = yield Trello.get(APIS.BOARDS)
    .then(_boards => _boards)
    .catch(error => {
      console.log("Error fetching boards...", error);
      return [];
    });
  yield put(setBoards(boards));
}
function* fetchBoardsSaga() {
  yield takeLatest(FETCH_BOARDS, fetchBoards);
}

function* fetchLabels(action) {
  const labels = yield Trello.get(APIS.labels(action.boardId))
    .then(_labels => _labels)
    .catch(error => {
      console.log("Error fetching labels...", error);
      return [];
    });
  yield put(setLabels(labels));
}
function* fetchLabelsSaga() {
  yield takeLatest(FETCH_LABELS, fetchLabels);
}

export default function* boardSagas() {
  yield all([fetchBoardsSaga(), fetchLabelsSaga()]);
}
