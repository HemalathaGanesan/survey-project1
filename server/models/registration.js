const mongoose = require('mongoose');

// reg. schema
const registrationSchema = mongoose.Schema({
  email: String,
  password: String,
  hospital: String
})

module.exports = mongoose.model("registraionDetails", registrationSchema);
