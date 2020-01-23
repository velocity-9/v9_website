require('dotenv').config();
const express = require('express');
const session = require('express-session');

const http = require('http');
const passport = require('passport');
const socketio = require('socket.io');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const authRouter = require('./auth/auth.router');
const dbRouter = require('./db/db.router');
const passportInit = require('./auth/passport.init');
const verifyEnv = require('./util/verify_env');

// Initialize express app
const app = express();
// Create HTTP server, this will eventually be https
const server = http.createServer(app);

// Check for required env variables
verifyEnv();

app.use(logger('dev'));
app.use(express.static('dist'));

// Allow for parsing JSON
app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SECRET],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(cookieParser());

// Used to store session data
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passportInit();

const io = socketio(server);
app.set('io', io);

// Register the authentication router
app.use('/api/auth', authRouter);
app.use('/api/db', dbRouter);


server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
