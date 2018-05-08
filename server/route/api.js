const express = require('express');
const router = express.Router();
const Survey = require('../models/survey')
const Surveyform = require('../models/surveyForm')
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post("/survey", passport.authenticate('jwt', { session: false }), function (req, res) {
  var data = req.body;
  Survey.create({ value: data }).then(() => {
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

router.post('/store', passport.authenticate('jwt', { session: false }), function (req, res) {
  var data = req.body;
  Surveyform.create({ _id: 'sample', form: data }).then(() => {
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

router.get('/formname', passport.authenticate('jwt', { session: false }), function (req, res) {
  Surveyform.find()
    .then((data) => {
      var ids = data.map((value) => {
        return value._id;
      })
      res.send(ids)
    })
})

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

module.exports = router;