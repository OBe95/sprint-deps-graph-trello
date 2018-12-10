const TRELLO_CONFIG = require('./config');

const authorize = function (req, res) {
  const socketId = req.query.socketId;
  if (socketId) {
    req.app.get('oauth').getOAuthRequestToken(function (error, token, tokenSecret) {
      if (error) {
        res.status(401).send();
      } else {
        req.app.get('oauth_secrets')[token] = tokenSecret;
        req.app.get('oauth_sockets')[token] = socketId;
        res.redirect(`${TRELLO_CONFIG.authorizeURL}?oauth_token=${token}&name=${TRELLO_CONFIG.appName}`);
      }
    });
  } else {
    res.status(401).send();
  }
};

const authorizeCallback = function (req, res) {
  const token = req.query.oauth_token;
  const tokenSecret = req.app.get('oauth_secrets')[token];
  const socketId = req.app.get('oauth_sockets')[token];
  const verifier = req.query.oauth_verifier;
  req.app.get('oauth').getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret) {
    if (error) {
      req.app.get('io').in(socketId).emit("unauthorized", error);
    }
    req.app.get('access_secrets')[accessToken] = accessTokenSecret;
    req.app.get('io').in(socketId).emit("authorized", accessToken);
  });
};

module.exports = { authorize, authorizeCallback }