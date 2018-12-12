import { authorizationReducer } from "containers/Authorization/reducer";
import { boardReducer } from "containers/Board/reducer";
import { homeReducer } from "containers/Home/reducer";

export const sprintDepsGraphReducer = {
  authorizationReducer,
  boardReducer,
  homeReducer
};

export default { sprintDepsGraphReducer };
