const mongoose = require('mongoose');

// reg. schema
const registrationSchema = mongoose.Schema({
  _id:String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  googleId: String,
  hospital: String,
  isVerified: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("registraionDetails", registrationSchema);
