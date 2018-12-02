import * as constants from "containers/Board/constants";

const initialState = {
  boards: [],
  labels: [],
  selectedBoard: {},
  selectedLabel: {},
  cards: [],
  user: null
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BOARDS:
      return { ...state, boards: action.boards };
    case constants.RESET_BOARDS:
      return { ...state, boards: [] };
    case constants.SET_LABELS:
      return { ...state, labels: action.labels };
    case constants.RESET_LABELS:
      return { ...state, labels: [] };
    case constants.SET_SELECTED_BOARD:
      return { ...state, selectedBoard: action.board };
    case constants.RESET_SELECTED_BOARD:
      return { ...state, selectedBoard: {} };
    case constants.SET_SELECTED_LABEL:
      return { ...state, selectedLabel: action.label };
    case constants.RESET_SELECTED_LABEL:
      return { ...state, selectedLabel: [] };
    case constants.SET_CARDS:
      return { ...state, cards: action.cards };
    case constants.RESET_CARDS:
      return { ...state, cards: [] };
    case constants.SET_USER:
      return { ...state, user: action.user };
    case constants.RESET_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default { boardReducer };
