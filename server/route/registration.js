const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const registration = require('../models/registration.js')

// get request
router.get('/', (req, res) => {
  registration.find({})
    .then(data => res.send(data))
});

router.get('/:email', (req, res) => {
  registration.find({ email: req.params.email })
    .then(data => res.send(data))
});


// post request
router.post('/', (req, res) => {
  // var data = req.body;
  // console.log("old data", data);

  registration.find({ email: req.body.email })
    .then(user => {
      if (user.length >= 1) {
        return res.json({
          message: "mail already exists",
          isMailExist: true
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
                  res.json({
                    message: "registed succesfully"
                  })
                })
                .catch(err => {
                  res.json({
                    error: err
                  })
                })


              // send confirmation mail 

              // const url = `http://localhost:3000/confirmation/${emailToken}`;
              const url = `http://localhost:3000/login/`;
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
                  from: `"Confirm mail" <${account.user}>`,
                  to: req.body.email,
                  subject: 'Confirm Email',
                  // text: 'Hello, click below link to confirm !!',
                  html: `hello!! Please click this link to confirm your email: <a href="${url}">${url}</a>`,
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
            }
          });
        });
      }
    })
});

module.exports = router;