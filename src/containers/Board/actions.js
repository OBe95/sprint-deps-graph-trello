import * as constants from "containers/Board/constants";

export const fetchBoards = () => ({
  type: constants.FETCH_BOARDS
});

export const setBoards = boards => ({
  type: constants.SET_BOARDS,
  boards
});

export const resetBoards = () => ({
  type: constants.RESET_BOARDS
});

export const fetchLabels = boardId => ({
  type: constants.FETCH_LABELS,
  boardId
});

export const setLabels = labels => ({
  type: constants.SET_LABELS,
  labels
});

export const resetLabels = () => ({
  type: constants.RESET_LABELS
});
