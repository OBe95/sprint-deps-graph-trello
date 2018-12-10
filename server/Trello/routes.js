const TRELLO_CONFIG = require('./config');

const getUser = function (req, res) {
  const accessToken = req.query.token;
  const accessTokenSecret = req.app.get('access_secrets')[accessToken];

  const url = `${TRELLO_CONFIG.base_url}/members/me?fields=fullName,initials`

  req.app.get('oauth').getProtectedResource(url, "GET", accessToken, accessTokenSecret, function (error, user) {
    if (error) {
      console.error("#### getUser error", error);
      res.status(401).send(error);
    } else {
      console.log("#### getUser", user);
      res.status(200).send(user);
    }
  });
};
const getBoards = function (req, res) {
  const accessToken = req.query.token;

  const accessTokenSecret = req.app.get('access_secrets')[accessToken];

  const url = `${TRELLO_CONFIG.base_url}/members/me/boards?fields=name`;

  req.app.get('oauth').getProtectedResource(url, "GET", accessToken, accessTokenSecret, function (error, boards) {
    if (error) {
      console.error("#### getBoards error", error);
      res.status(401).send(error);
    } else {
      console.log("#### getBoards", boards);
      res.status(200).send(boards);
    }
  });
};
const getLabels = function (req, res) {
  const accessToken = req.query.token;
  const boardId = req.query.boardId;

  const accessTokenSecret = req.app.get('access_secrets')[accessToken];

  const url = `${TRELLO_CONFIG.base_url}/boards/${encodeURIComponent(boardId)}/labels?fields=name,color`;

  req.app.get('oauth').getProtectedResource(url, "GET", accessToken, accessTokenSecret, function (error, labels) {
    if (error) {
      console.error("#### getLabels error", error);
      res.status(401).send(error);
    } else {
      console.log("#### getLabels", labels);
      res.status(200).send(labels);
    }
  });
};
const getCards = function (req, res) {
  const accessToken = req.query.token;
  const labelName = req.query.labelName;
  const boardId = req.query.boardId;

  const accessTokenSecret = req.app.get('access_secrets')[accessToken];

  const url = [
    `${TRELLO_CONFIG.base_url}`,
    `/search?query=label:"${encodeURIComponent(labelName)}"`,
    `&idBoards=${encodeURIComponent(boardId)}`,
    `&card_fields=name,idShort`,
    `&cards_limit=1000`
  ].join("");

  req.app.get('oauth').getProtectedResource(url, "GET", accessToken, accessTokenSecret, function (error, cards) {
    if (error) {
      console.error("#### getCards error", error);
      res.status(401).send(error);
    } else {
      console.log("#### getCards", cards);
      res.status(200).send(cards);
    }
  });
};

module.exports = { getUser, getBoards, getLabels, getCards }
