module.exports = {
  Trello: window.Trello,
  LOCAL_STORAGE_KEY: "trello_token",
  config: {
    type: "popup",
    name: "Trello dependency graph",
    scope: {
      read: true,
      write: false
    },
    expiration: "1day",
    response_type: "token"
  }
};
