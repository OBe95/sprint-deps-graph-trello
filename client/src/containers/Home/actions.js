import { SET_MESSAGE, RESET_MESSAGE } from "containers/Home/constants";

export const setMessage = (messageContent, messageType) => ({
  type: SET_MESSAGE,
  messageContent,
  messageType
});

export const resetMessage = () => ({
  type: RESET_MESSAGE
});
