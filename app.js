var createError = require('http-errors');
var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tempProject')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

  var apiRouter = require('./routes/api');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/nProj')));
app.use('/login', express.static(path.join(__dirname, 'dist/nProj')));
app.use('/register', express.static(path.join(__dirname, 'dist/nProj')));
app.use('/api', apiRouter);


app.use(function(req, res, next) {
  next();
});


module.exports = app;
