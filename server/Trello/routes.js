const TRELLO_CONFIG = require('./config');
const redisHelper = require('../Redis/helper');

const handleError = (method, error, res) => {
  console.error(`### ${method} error:`, error);
  res.status(401).send(error);
}

const getUser = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      handleError("getUser", new Error("token is not defined"), res);
      return;
    }

    const redisClient = req.app.get('redis_client');
    const tokenSecret = await redisHelper.getAsync(redisClient, redisHelper.formatTokenSecret(token));

    req.app.get('oauth').getProtectedResource(TRELLO_CONFIG.urls.user, 'GET', token, tokenSecret, (error, user) => {
      if (error) {
        handleError("getUser", error, res);
      } else {
        res.status(200).send(user);
      }
    });
  } catch (error) {
    handleError("getUser", error, res);
  }
};

const getBoards = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      handleError("getBoards", new Error("token is not defined"), res);
      return;
    }

    const redisClient = req.app.get('redis_client');
    const tokenSecret = await redisHelper.getAsync(redisClient, redisHelper.formatTokenSecret(token));

    req.app.get('oauth').getProtectedResource(TRELLO_CONFIG.urls.boards, 'GET', token, tokenSecret, (error, boards) => {
      if (error) {
        handleError("getBoards", error, res);
      } else {
        res.status(200).send(boards);
      }
    });
  } catch (error) {
    handleError("getBoards", error, res);
  }
};

const getLabels = async (req, res) => {
  const { token, boardId } = req.query;

  try {
    if (!token) {
      handleError("getLabels", new Error("token is not defined"), res);
      return;
    }

    const redisClient = req.app.get('redis_client');
    const tokenSecret = await redisHelper.getAsync(redisClient, redisHelper.formatTokenSecret(token));

    req.app.get('oauth').getProtectedResource(TRELLO_CONFIG.urls.labels(boardId), 'GET', token, tokenSecret, (error, labels) => {
      if (error) {
        handleError("getLabels", error, res);
      } else {
        res.status(200).send(labels);
      }
    });
  } catch (error) {
    handleError("getLabels", error, res);
  }
};
const getCards = async (req, res) => {
  const { token, boardId, labelName } = req.query;

  try {
    if (!token) {
      handleError("getCards", new Error("token is not defined"), res);
      return;
    }

    const redisClient = req.app.get('redis_client');
    const tokenSecret = await redisHelper.getAsync(redisClient, redisHelper.formatTokenSecret(token));

    req.app.get('oauth').getProtectedResource(TRELLO_CONFIG.urls.cards(boardId, labelName), 'GET', token, tokenSecret, (error, cards) => {
      if (error) {
        handleError("getCards", error, res);
      } else {
        res.status(200).send(cards);
      }
    });
  } catch (error) {
    handleError("getCards", error, res);
  }
};

module.exports = {
  getUser, getBoards, getLabels, getCards,
};
