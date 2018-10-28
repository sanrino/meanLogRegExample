var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Note = require('../models/Note.js');



router.get('/note/:id', function(req, res, next) {
  Note.find({userid:req.params.id},function (err, notes) {
    if (err) return next(err);
    res.json(notes);
  });
});
/* GET SINGLE User BY ID */
router.get('/:name/:password', function(req, res, next) {
  User.find({username:req.params.name,password:req.params.password}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE User */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



router.post('/note', function(req, res, next) {
  Note.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



router.put('/note/:id', function(req, res, next) {
  Note.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err){ return next(err);}
    res.json(post);
  });
});


router.delete('/note/:id', function(req, res, next) {
  Note.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
