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

export default { makeSelectBoards, makeSelectLabels };
