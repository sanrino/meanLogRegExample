var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  userid: String,
  text: String,
});

module.exports = mongoose.model('Note', NoteSchema);
