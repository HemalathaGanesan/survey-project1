const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/usermodel')

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        console.log('passport callback funtion fired')
        console.log(profile);
        User.create({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value

        })
    })
)
