module.exports = {
  Trello: window.Trello,
  LOCAL_STORAGE_KEY: "trello_token",
  CONFIG: {
    type: "popup",
    name: "Trello dependency graph",
    scope: {
      read: true,
      write: false
    },
    expiration: "1day",
    response_type: "token"
  },
  APIS: {
    BOARDS: "/members/me/boards?fields=name",
    labels: boardId => `/boards/${boardId}/labels?fields=name,color`
  },
  setToken(token) {
    this.Trello.setToken(token);
  }
};
