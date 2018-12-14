const API_URL = process.env.REACT_APP_API_URL;

module.exports = {
  LOCAL_STORAGE_KEY: "trello_token",
  URLS: {
    boards: token => `${API_URL}/boards?token=${token}`,
    labels: (token, boardId) =>
      `${API_URL}/labels?token=${token}&boardId=${boardId}`,
    cards: (token, boardId, labelName) =>
      `${API_URL}/cards?token=${token}&labelName=${encodeURIComponent(
        labelName
      )}&boardId=${encodeURIComponent(boardId)}`,
    user: token => `${API_URL}/user?token=${token}`,
    logout: token => `${API_URL}/logout?token=${token}`
  }
};
