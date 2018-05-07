const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const registration = require('../models/registration.js');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/keys')

// get request
router.get('/', (req, res) => {
  registration.find({})
    .then(data => res.json(data))
});

router.get('/:userId', (req, res) => {
  registration.find({ _id: req.params.userId })
    .then(result => {
      let token = jwt.sign(result[0].toJSON(), config.secretKey, {
        expiresIn: "1h"
      });
      res.json({
        message: "Account updated",
        success: true,
        token: token
      })
    })
});

// google authantication
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
})
);

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  // console.log("req.user", req.user);
  if (req.user.hospital) {
    let token = jwt.sign(req.user.toJSON(), config.secretKey, {
      expiresIn: "1h"
    });
    res.cookie('jwt', token);
    res.redirect(`http://localhost:3000/registerWithGoogle/`);
  } else {
    // res.cookie('jwt', token);
    res.redirect(`http://localhost:3000/registerWithGoogle/${req.user._id}`)
  }
})


// post request
router.post('/', (req, res) => {
  registration.find({ email: req.body.email })
    .then(user => {
      if (user.length >= 1) {
        return res.json({
          message: "Mail already exists",
          success: true
        });
      } else {
        //encrypt password using bcrypt
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
              return res.json({
                error: err
              })
            } else {
              // store hash in your password DB.
              const register = new registration({
                email: req.body.email,
                password: hash,
                hospital: req.body.hospital
              })
              register.save()
                .then(result => {
                  // send confirmation mail 
                  const url = `http://localhost:3000/verifyUser/${result._id}`;
                  const mailAccount = {
                    user: 'test.skiploop@gmail.com',
                    password: 'Test@123',
                  }

                  nodemailer.createTestAccount((err, account) => {
                    let transporter = nodemailer.createTransport({
                      host: 'smtp.gmail.com',
                      port: 587,
                      secure: false,
                      auth: {
                        user: mailAccount.user,
                        pass: mailAccount.password
                      }
                    });

                    let mailOptions = {
                      from: `"Confirm mail" <${mailAccount.user}>`,
                      to: req.body.email,
                      subject: 'Confirm Email',
                      html: `Hello!! <br />Please click this link to confirm your email: <a href="${url}">${url}</a>`,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        return console.log(error);
                      }
                      console.log('Message sent: %s', info.messageId);
                      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    });
                  })
                  res.json({
                    message: "Registered succesfully"
                  })
                })
                .catch(err => res.json({ error: err }))
            }
          });
        });
      }
    })
});

// put request
router.put('/:userId', (req, resp) => {
  registration.findOne({ _id: req.params.userId })
    .then(data => {
      if (data.hospital) {
        resp.json({
          message: "Failed, hospital already updated",
          success: false
        })
      } else {
        registration.findByIdAndUpdate({ _id: req.params.userId }, req.body)
          .then(() => {
            registration.findOne({ _id: req.params.userId })
              .then(result => {
                // console.log("result", result)
                let token = jwt.sign(result.toJSON(), config.secretKey, {
                  expiresIn: "1h"
                });
                // resp.cookie('jwt', token);
                resp.json({
                  message: "Account updated, Wait.. Redirecting to Login page",
                  success: true,
                  token: token
                })
              })
          })
      }
    })
    .catch(err => resp.json(err))
})

router.put('/verifyUser/:userId', (req, res) => {
  registration.findByIdAndUpdate({ _id: req.params.userId })
    .then(result => {
      // console.log("result", result)
      if (result.isVerified === false) {
        registration.findByIdAndUpdate({ _id: req.params.userId }, { isVerified: true })
          .then(updatedResult => {
            // console.log("updatedresult", updatedResult)
          })
        res.json({
          message: "User verifed susscfully",
          success: true
        })
      } else {
        res.json({
          message: "User already verifed",
          success: false
        })
      }
    })
    .catch(err => res.json({ error: err }))
})

module.exports = router;