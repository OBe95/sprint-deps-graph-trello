import { authorizationReducer } from "containers/Authorization/reducer";
import { boardReducer } from "containers/Board/reducer";

export const trelloDepsGraphReducer = {
  authorizationReducer,
  boardReducer
};

export default { trelloDepsGraphReducer };
