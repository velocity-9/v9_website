require('dotenv').config();
const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const logger = require('morgan');
const path = require('path');
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config');
const authRouter = require('./lib/auth.router');
const testRouter = require('./router');
const passportInit = require('./lib/passport.init');

const app = express();
const server = http.createServer();

app.use(logger('dev'));

app.use(express.static('dist'));

app.use(express.json());
app.use(passport.initialize());
passportInit();

app.use(cors({
  origin: CLIENT_ORIGIN
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

const io = socketio(server);
app.set('io', io);

app.get('/', (req, res) => {
  res.send('hello, world!');
});

//app.use('/api', testRouter);

//app.use('/', authRouter);


console.log('TESTING');
console.log(`${process.env.GITHUB_SECRET}`);
server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
