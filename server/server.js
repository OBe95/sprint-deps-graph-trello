const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const OAuth = require('oauth').OAuth;

const TRELLO_CONFIG = require('./Trello/config');
const trelloAuth = require('./Trello/auth');
const trelloRoutes = require('./Trello/routes');

// TODO: USE ENV VARS
const PORT = 5000;
const CLIENT_URL = `http://localhost:3000`;

// Create the server and allow express and socketio to run on the same port
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected for reason ${reason}`)
  });
});

app.use(express.json());

app.use(cors({
  origin: CLIENT_URL
}));

// TODO: USE REDIS TO PERSIST SECRETS
app.set('oauth_secrets', {});
app.set('access_secrets', {});
app.set('oauth_sockets', {});
app.set('oauth', new OAuth(TRELLO_CONFIG.requestURL, TRELLO_CONFIG.accessURL, TRELLO_CONFIG.key, TRELLO_CONFIG.secret, "1.0A", TRELLO_CONFIG.authorizeCallback, "HMAC-SHA1"));


app.get("/authorize", trelloAuth.authorize);
app.get("/authorize/callback", trelloAuth.authorizeCallback);
app.get("/user", trelloRoutes.getUser);
app.get("/boards", trelloRoutes.getBoards);
app.get("/labels", trelloRoutes.getLabels);
app.get("/cards", trelloRoutes.getCards);

server.listen(PORT, () => {
  console.log('Server up and running...🏃🏃🏻');
  console.log("Listening on port %s", server.address().port);
})