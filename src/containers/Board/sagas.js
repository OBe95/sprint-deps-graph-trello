import { put, takeLatest, all } from "redux-saga/effects";

import {
  FETCH_BOARDS,
  FETCH_LABELS,
  FETCH_CARDS,
  FETCH_USER
} from "containers/Board/constants";
import {
  setBoards,
  setLabels,
  setCards,
  setUser
} from "containers/Board/actions";
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

function* fetchCards(action) {
  let error = null;
  const response = yield Trello.get(
    API_URLS.cards(action.boardId, action.labelName)
  )
    .then(_cards => _cards)
    .catch(_error => {
      error = _error;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  yield put(setCards(response.cards));
}
function* fetchCardsSaga() {
  yield takeLatest(FETCH_CARDS, fetchCards);
}

function* fetchUser() {
  let error = null;
  const user = yield Trello.get(API_URLS.USER)
    .then(_user => _user)
    .catch(_error => {
      error = _error;
      return null;
    });

  if (error) {
    yield* errorHandler(error);
  }

  yield put(setUser(user));
}
function* fetchUserSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}

export default function* boardSagas() {
  yield all([
    fetchBoardsSaga(),
    fetchLabelsSaga(),
    fetchCardsSaga(),
    fetchUserSaga()
  ]);
}
