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
  API_URLS: {
    USER: "/members/me?fields=fullName,initials",
    BOARDS: "/members/me/boards?fields=name",
    labels: boardId =>
      `/boards/${encodeURIComponent(boardId)}/labels?fields=name,color`,
    cards: (boardId, labelName) =>
      [
        `/search?query=label:"${encodeURIComponent(labelName)}"`,
        `&idBoards=${encodeURIComponent(boardId)}`,
        `&card_fields=name,idShort`,
        `&cards_limit=1000`
      ].join("")
  }
};
