const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const { OAuth } = require('oauth');
const redis = require('redis');

require('dotenv').config();

const TRELLO_CONFIG = require('./Trello/config');
const trelloAuth = require('./Trello/auth');
const trelloRoutes = require('./Trello/routes');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
app.set('io', io);
// TODO: USE SERVER LOGGER
io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected for reason ${reason}`);
  });
});

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
app.set('redis_client', redisClient);
redisClient.on('connect', () => {
  console.log('Redis client connected');
});
redisClient.on('error', (error) => {
  console.log(`Something went wrong with redis client ${error}`);
});

app.set('oauth', new OAuth(TRELLO_CONFIG.requestURL, TRELLO_CONFIG.accessURL, TRELLO_CONFIG.key, TRELLO_CONFIG.secret, '1.0A', TRELLO_CONFIG.authorizeCallback, 'HMAC-SHA1'));


app.get('/authorize', trelloAuth.authorize);
app.get('/authorize/callback', trelloAuth.authorizeCallback);
app.get('/logout', trelloAuth.logout);
app.get('/user', trelloRoutes.getUser);
app.get('/boards', trelloRoutes.getBoards);
app.get('/labels', trelloRoutes.getLabels);
app.get('/cards', trelloRoutes.getCards);

server.listen(process.env.API_PORT, () => {
  console.log('Server up and running...🏃🏃🏻');
  console.log('Listening on port %s', server.address().port);
});
