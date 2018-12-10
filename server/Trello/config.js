module.exports = {
  key: process.env.TRELLO_API_KEY,
  secret: process.env.TRELLO_API_SECRET,
  authorizeCallback: `${process.env.API_URL}/authorize/callback`,
  requestURL: process.env.TRELLO_REQUEST_URL,
  accessURL: process.env.TRELLO_ACCESS_URL,
  authorizeURL: token => `${process.env.TRELLO_AUTHORIZE_URL}?oauth_token=${token}&name=${process.env.APP_NAME}&expiration=1day&scope=read`,
  urls: {
    user: `${process.env.TRELLO_API_BASE_URL}/members/me?fields=fullName,initials`,
    boards: `${process.env.TRELLO_API_BASE_URL}/members/me/boards?fields=name`,
    labels: boardId => (`${process.env.TRELLO_API_BASE_URL}/boards/${encodeURIComponent(boardId)}/labels?fields=name,color`),
    cards: (boardId, labelName) => ([
      `${process.env.TRELLO_API_BASE_URL}`,
      `/search?query=label:"${encodeURIComponent(labelName)}"`,
      `&idBoards=${encodeURIComponent(boardId)}`,
      '&card_fields=name,idShort',
      '&cards_limit=1000',
    ].join('')),

  },
};
