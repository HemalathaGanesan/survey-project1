const express = require('express');
const router = express.Router();
const login = require('../models/login.js');
const registration = require('../models/registration.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const sample = require('../../src/sample.json')



// get request
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send("welcome to dashboad get req from server")
});

// post request
router.post("/survey", verifyToken, function (req, res) {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      })
    } else {
      var data = req.body;
      Survey.create({ value: data })
        .then(() => {
          res.status(201).send({
            status: 'success'
          })
        })
        .catch(err => {
          res.status(500).send({
            status: 'failure'
          })
        })
    }
  })
});

router.post('/store', verifyToken, function (req, res) {
  console.log(req.body._id)
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      })
    } else {
      Surveyform.find({ _id: req.body._id })
        .then(data => {
          console.log(data)
          if (data.length === 0) {
            console.log("inside data if")
            Surveyform.create(req.body)
              .then((data) => {
                res.status(201).send({
                  success: true,
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).send({
                  success: false
                })
              })
          }
          else {
            maindata = true;
            console.log("inside data else");
            console.log("maindata if");
            res.send({
              success: true
            })
          }
        })
    }
  })
})
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


module.exports = router;