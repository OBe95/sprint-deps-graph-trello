import { all, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";

import { resetTrelloToken } from "containers/Authorization/actions";
import { makeSelectTrelloToken } from "containers/Authorization/selectors";
import {
  setBoards,
  setCards,
  setLabels,
  setUser
} from "containers/Board/actions";
import {
  FETCH_BOARDS,
  FETCH_CARDS,
  FETCH_LABELS,
  FETCH_USER,
  LOGOUT
} from "containers/Board/constants";
import { setMessage } from "containers/Home/actions";
import { errorHandler } from "containers/Trello/helper";

// TODO: EXPORT URLS TO CONFIG FILE
function* fetchBoards() {
  const token = yield select(makeSelectTrelloToken());

  if (token) {
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

    yield put(setBoards(boards));
  }
}
function* fetchBoardsSaga() {
  yield takeLatest(FETCH_BOARDS, fetchBoards);
}

function* fetchLabels(action) {
  const token = yield select(makeSelectTrelloToken());

  if (token) {
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

    yield put(setLabels(labels));
  }
}
function* fetchLabelsSaga() {
  yield takeLatest(FETCH_LABELS, fetchLabels);
}

function* fetchCards(action) {
  const token = yield select(makeSelectTrelloToken());

  if (token) {
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

    yield put(setCards(response.cards));
  }
}
function* fetchCardsSaga() {
  yield takeLatest(FETCH_CARDS, fetchCards);
}

function* fetchUser() {
  const token = yield select(makeSelectTrelloToken());

  if (token) {
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

    yield put(setUser(user));
    yield put(setMessage(`Welcome ${user.fullName}`, "success"));
  }
}
function* fetchUserSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}

function* logout() {
  const token = yield select(makeSelectTrelloToken());

  if (token) {
    let error = null;
    yield axios
      .get(`http://localhost:5000/logout?token=${token}`)
      .catch(_error => {
        error = _error.response;
        return null;
      });

    if (error) {
      yield* errorHandler(error);
    }

    yield put(resetTrelloToken());
  }
}
function* logoutSaga() {
  yield takeLatest(LOGOUT, logout);
}

export default function* boardSagas() {
  yield all([
    fetchBoardsSaga(),
    fetchLabelsSaga(),
    fetchCardsSaga(),
    fetchUserSaga(),
    logoutSaga()
  ]);
}
