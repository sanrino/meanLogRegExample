var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  username: String,
});

module.exports = mongoose.model('User', UserSchema);
