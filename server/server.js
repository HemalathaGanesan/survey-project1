const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser')

const PORT = 3001;

// express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/survey');
mongoose.connection
  .once("open", function () {
    console.log("connection success");
  })
  .on("error", function (err) {
    console.log("Connection Error", err);
  });

mongoose.Promise = global.Promise;

// use headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

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

// use cookies
app.use(cookieParser())

// use routes
app.use('/api/registration', require('./route/registration.js'));
app.use('/api/login', require('./route/login.js'));
app.use('/api/dashboard', require('./route/dashboard.js'));
// app.use("/api", require("./route/api"))

// hadling errors
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send({ error: error.message })
})

// server listening
app.listen(PORT, () => console.log("server started"))





















