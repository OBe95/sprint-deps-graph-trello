// TODO: USE ENV VARS
module.exports = {
  key: 'API_KEY',
  secret: '8dc054b268ec8f3c8bd62c8b20c24c54da4bf901219d19828f1b8094ddc06355',
  authorizeCallback: `http://localhost:5000/authorize/callback`,
  base_url: "https://api.trello.com/1",
  requestURL: "https://trello.com/1/OAuthGetRequestToken",
  accessURL: "https://trello.com/1/OAuthGetAccessToken",
  authorizeURL: "https://trello.com/1/OAuthAuthorizeToken",
  appName: "Sprint Dependencies Graph ~ Trello"
};