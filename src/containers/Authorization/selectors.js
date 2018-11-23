import { createSelector } from "reselect";

const getAuthorizationState = state => state.authorizationReducer;

export const makeSelectTrelloToken = () =>
  createSelector(
    [getAuthorizationState],
    authorizationState => authorizationState.trelloToken
  );

export default { makeSelectTrelloToken };
