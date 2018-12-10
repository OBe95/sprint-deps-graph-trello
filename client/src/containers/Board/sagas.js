import { put, takeLatest, all, select } from "redux-saga/effects";

import axios from "axios";

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
import { errorHandler } from "containers/Trello/helper";
import { makeSelectTrelloToken } from "containers/Authorization/selectors";

// TODO: EXPORT URLS TO CONFIG FILE
function* fetchBoards() {
  const token = yield select(makeSelectTrelloToken());

  let error = null;
  const boards = yield axios
    .get(`http://localhost:5000/boards?token=${token}`)
    .then(response => response.data)
    .catch(_error => {
      error = _error.response;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  console.log("setting boards", boards);
  yield put(setBoards(boards));
}
function* fetchBoardsSaga() {
  yield takeLatest(FETCH_BOARDS, fetchBoards);
}

function* fetchLabels(action) {
  const token = yield select(makeSelectTrelloToken());
  const { boardId } = action;

  let error = null;
  const labels = yield axios
    .get(`http://localhost:5000/labels?token=${token}&boardId=${boardId}`)
    .then(response => response.data)
    .catch(_error => {
      error = _error.response;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  console.log("setting labels", labels);
  yield put(setLabels(labels));
}
function* fetchLabelsSaga() {
  yield takeLatest(FETCH_LABELS, fetchLabels);
}

function* fetchCards(action) {
  const token = yield select(makeSelectTrelloToken());
  const { labelName, boardId } = action;

  let error = null;
  const response = yield axios
    .get(
      `http://localhost:5000/cards?token=${token}&labelName=${encodeURIComponent(
        labelName
      )}&boardId=${encodeURIComponent(boardId)}`
    )
    .then(_response => _response.data)
    .catch(_error => {
      error = _error.response;
      return [];
    });

  if (error) {
    yield* errorHandler(error);
  }

  console.log("setting cards", response.cards);
  yield put(setCards(response.cards));
}
function* fetchCardsSaga() {
  yield takeLatest(FETCH_CARDS, fetchCards);
}

function* fetchUser() {
  const token = yield select(makeSelectTrelloToken());

  let error = null;
  const user = yield axios
    .get(`http://localhost:5000/user?token=${token}`)
    .then(response => response.data)
    .catch(_error => {
      error = _error.response;
      return null;
    });

  if (error) {
    yield* errorHandler(error);
  }

  console.log("setting user", user);
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
