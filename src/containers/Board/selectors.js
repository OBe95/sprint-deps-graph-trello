import { createSelector } from "reselect";

const getBoardState = state => state.boardReducer;

export const makeSelectBoards = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.boards
  );

export const makeSelectLabels = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.labels
  );

export const makeSelectSelectedBoard = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.selectedBoard
  );

export const makeSelectSelectedLabel = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.selectedLabel
  );

export const makeSelectCards = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.cards
  );

export const makeSelectUser = () =>
  createSelector(
    [getBoardState],
    boardState => boardState.user
  );

export default {
  makeSelectBoards,
  makeSelectLabels,
  makeSelectSelectedBoard,
  makeSelectSelectedLabel,
  makeSelectCards,
  makeSelectUser
};
