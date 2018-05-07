const express = require('express');
const router = express.Router();
const Survey = require('../models/survey')
const Surveyform = require('../models/surveyForm')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

// get request
router.get('/formname', function (req, res) {
  // jwt.verify(req.token, config.secretKey, (err, authData) => {
  //   if (err) {
  //     // res.status(403).json({
  //     //   message: "token expired"
  //     // });
  //     res.redirect("/")
  //   } else {
  //     console.log("else")
  //     res.json({
  //       msg: "post request",
  //       authData
  //     })
  //   }
  // });
  Surveyform.find()
    .then((data) => {
      var ids = data.map((value) => {
        return value._id;
      })
      res.send(ids)
    })
});

router.get('/forms/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
  var form = req.params.id;
  Surveyform.aggregate([
    {
      $match: {
        _id: form
      }
    },
    {
      $project: {
        _id: 0,
      }
    }
  ]).then((data) => {
    res.send(data[0])
  })
})

// post request
router.post("/survey", passport.authenticate('jwt', { session: false }), function (req, res) {
  var data = req.body;
  Survey.create({ value: data })
    .then(() => {
      res.send({
        status: 'success'
      })
    })
    .catch(err => {
      res.send({
        status: 'failure'
      })
    })
})

router.post('/store', function (req, res) {
  var data = req.body;
  Surveyform.create({ _id: 'sample', form: data })
    .then(() => {
      res.send({
        status: 'success'
      })
    })
    .catch(err => {
      res.send({
        status: 'failure'
      })
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