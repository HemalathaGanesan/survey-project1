const express = require('express');
const router = express.Router();
const login = require('../models/login.js');
const registration = require('../models/registration.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// get request
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send("welcome to dashboad get req from server")
});

// post request
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const data = req.body;
  // console.log('old', data)
  res.send("welcome to dashboad post req from server")
})

module.exports = router;