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

export const setSelectedBoard = board => ({
  type: constants.SET_SELECTED_BOARD,
  board
});

export const resetSelectedBoard = () => ({
  type: constants.RESET_SELECTED_BOARD
});

export const setSelectedLabel = label => ({
  type: constants.SET_SELECTED_LABEL,
  label
});

export const resetSelectedLabel = () => ({
  type: constants.RESET_SELECTED_LABEL
});

export const fetchCards = (boardId, labelName) => ({
  type: constants.FETCH_CARDS,
  boardId,
  labelName
});

export const setCards = cards => ({
  type: constants.SET_CARDS,
  cards
});

export const resetCards = () => ({
  type: constants.RESET_CARDS
});
