import { createSelector } from "reselect";

const getHomeState = state => state.homeReducer;

export const makeSelectMessageAndType = () =>
  createSelector(
    [getHomeState],
    homeState => ({
      message: homeState.messageContent,
      type: homeState.messageType
    })
  );

export default { makeSelectMessageAndType };
