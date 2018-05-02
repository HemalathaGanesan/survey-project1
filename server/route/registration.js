const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const registration = require('../models/registration.js')

// get request
router.get('/reg', (req, res) => {
  // res.send('dasd')
  registration.find({})
    .then(data => res.send(data))
});

router.get('/reg/:id', (req, res) => {
  // res.send('dasd')
  registration.find({ email: req.params.id })
    .then(data => res.send(data))
});

// post request
router.post('/registration', (req, res) => {
  var data = req.body;
  // console.log("old data", data);

  //encrypt password using bcrypt
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      data.password = hash;
      // console.log('new data',data)
      registration.insertMany(data)
    });
  });

  // const url = `http://localhost:3000/confirmation/${emailToken}`;
  // const url = `http://localhost:3000/login/`;
  // const mailAccount = {
  //   user: 'test.skiploop@gmail.com',
  //   password: 'Test@123',
  // }

  // // send confirmation mail
  // nodemailer.createTestAccount((err, account) => {
  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: mailAccount.user,
  //       pass: mailAccount.password
  //     },
  //     // tls: {
  //     //   rejectUnauthorized: false
  //     // }
  //   });

  //   let mailOptions = {
  //     from: `"Confirm mail" <${account.user}>`,
  //     to: data.email,
  //     subject: 'Confirm Email',
  //     // text: 'Hello, click below link to confirm !!',
  //     html: `hello!! Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //   });
  // })
});

module.exports = router;