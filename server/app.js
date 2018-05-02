const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/survey_project');
mongoose.Promise = global.Promise;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use cors
app.use(cors())

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// use routes
app.use('/api', require('./route/registration.js'));
app.use('/api', require('./route/login.js'));


// server listening
app.listen(3001, () => console.log("server started"))