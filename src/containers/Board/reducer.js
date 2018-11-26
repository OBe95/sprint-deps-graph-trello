import {
  SET_BOARDS,
  RESET_BOARDS,
  SET_LABELS,
  RESET_LABELS
} from "containers/Board/constants";

const initialState = { boards: [], labels: [] };

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARDS:
      return { ...state, boards: action.boards };
    case RESET_BOARDS:
      return { ...state, boards: [] };
    case SET_LABELS:
      return { ...state, labels: action.labels };
    case RESET_LABELS:
      return { ...state, labels: [] };
    default:
      return state;
  }
};

export default { boardReducer };
