const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const Surveyform = require("../models/surveyForm");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");

// get request
router.get("/formname", verifyToken, function(req, res) {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      });
    } else {
      Surveyform.find().then(data => {
        var ids = data.map(value => {
          return value._id;
        });
        res.status(200).send(ids);
      });
    }
  });
});

router.get("/forms/:id", verifyToken, function(req, res) {
  console.log(req.params.id);
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      });
    } else {
      var form = req.params.id;
      Surveyform.aggregate([
        {
          $match: {
            _id: form
          }
        }
      ]).then(data => {
        res.status(200).send(data[0]);
      });
    }
  });
});

// post request
router.post("/survey", verifyToken, function(req, res) {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      });
    } else {
      var data = req.body;
      Survey.create({ value: data })
        .then(() => {
          res.status(201).send({
            status: "success"
          });
        })
        .catch(err => {
          res.status(500).send({
            status: "failure"
          });
        });
    }
  });
});

router.post("/store", function(req, res) {
  var data = req.body;
  Surveyform.create({ _id: "sample", form: data })
    .then(() => {
      res.status(201).send({
        status: "success"
      });
    })
    .catch(err => {
      res.status(500).send({
        status: "failure"
      });
    });
});

router.get("/user/:email/:form",verifyToken, function(req, res) {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({
        success: true,
        message: "token expired"
      });
    } else {
      let email = req.params.email;
      let form = req.params.form;
      Survey.aggregate([
        {
          $match: { "value.email": email, "value.title": form }
        },
        {
          $project: {
            _id: 0
          }
        }
      ]).then(data => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            status: "failure"
          });
        });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // console.log("req token send.....",req.token)
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
