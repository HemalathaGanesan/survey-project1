const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const login = require('../models/login.js');

// get request
router.get('/', (req, res) => {
});

// post request
router.post('/', (req, res) => {
  const data = req.body;
  console.log('old', data);
})



module.exports = router;