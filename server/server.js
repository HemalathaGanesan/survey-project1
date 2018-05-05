const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

// express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/survey_project', (err) => {
  if (err) {
    console.log("Unalbe to connect to DB", err);
  } else {
    console.log("connected to DB");
  }
});
mongoose.Promise = global.Promise;

// cookie time-limit
app.use(cookieSession({
  maxAge: 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use cors
app.use(cors())

// use headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// use routes
app.use('/api/registration', require('./route/registration.js'));
app.use('/api/login', require('./route/login.js'));
app.use('/api/dashboard', require('./route/dashboard.js'));

// server listening
app.listen(3001, () => console.log("server started"))