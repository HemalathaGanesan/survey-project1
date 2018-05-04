const mongoose = require('mongoose');

// reg. schema
const registrationSchema = mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  hospital: String,
  isVerified: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("registraionDetails", registrationSchema);
