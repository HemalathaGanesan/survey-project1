const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const login = require('../models/login.js');

// get request
router.get('/', (req, res) => {
});

// post request
router.post('/login', (req, res) => {
  const data = req.body;
  console.log('old', data)

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      data.password = hash;
      console.log('new data', data)
      // login.insertMany(data)
    });
  });
})

module.exports = router;