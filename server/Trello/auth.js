const TRELLO_CONFIG = require('./config');
const redisHelper = require('../Redis/helper');

const authorize = (req, res) => {
  const { socketId } = req.query;
  if (socketId) {
    req.app.get('oauth').getOAuthRequestToken((error, token, tokenSecret) => {
      if (error) {
        res.status(401).send();
      } else {
        const redisClient = req.app.get('redis_client');
        if (redisClient) {
          redisClient.set(redisHelper.formatAuthSecret(token), tokenSecret);
          redisClient.set(redisHelper.formatAuthSocket(token), socketId);
          res.redirect(TRELLO_CONFIG.authorizeURL(token));
        }
      }
    });
  } else {
    res.status(401).send();
  }
};

const authorizeCallback = async (req) => {
  const token = req.query.oauth_token;
  const verifier = req.query.oauth_verifier;

  try {
    const authSecretKey = redisHelper.formatAuthSecret(token);
    const authSocketKey = redisHelper.formatAuthSocket(token);
    const redisClient = req.app.get('redis_client');
    const tokenSecret = await redisHelper.getAsync(redisClient, authSecretKey);
    const socketId = await redisHelper.getAsync(redisClient, authSocketKey);

    req.app.get('oauth').getOAuthAccessToken(token, tokenSecret, verifier, (error, accessToken, accessTokenSecret) => {
      if (error) {
        req.app.get('io').in(socketId).emit('unauthorized', error);
      }
      redisClient.set(redisHelper.formatAccessToken(socketId), accessToken);
      redisClient.set(redisHelper.formatAccessTokenSecret(socketId), accessTokenSecret);
      req.app.get('io').in(socketId).emit('authorized', socketId);

      redisHelper.delAsync(redisClient, [authSecretKey, authSocketKey]);
    });
  } catch (error) {
    console.error('#### authorizeCallback error', error);
  }
};

const logout = (req, res) => {
  const { token } = req.query;
  if (token) {
    const redisClient = req.app.get('redis_client');
    redisHelper.delAsync(redisClient, [redisHelper.formatAccessToken(token), redisHelper.formatAccessTokenSecret(token)]).then(() => {
      res.status(204).send();
    }).catch(error => {
      console.error('#### logout error', error);
      res.status(401).send();
    });
  } else {
    console.error('#### logout error: token not defined');
    res.status(401).send();
  }
};

module.exports = { authorize, authorizeCallback, logout };
