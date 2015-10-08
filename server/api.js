var express = require('express');
var app = express();
var storage = require('./storage');

var Subject = require('./models/subject');

module.exports.getSubjects = function (req, res) {
  var subjects = storage.getItem('subjects') || [];
  res.json(subjects);
};

module.exports.createSubject = function (req, res) {
  var subjects = storage.getItem('subjects') || [];
  var newSubject = new Subject(req.body);
  if (newSubject.isValid()) {
    var newSubjects = newSubject.saveTo(subjects);
    storage.setItem('subjects', newSubjects);
    res.status(200).json(newSubject.attrs);
  } else {
    res.status(409).json({ errors: newSubject.validationFailures });
  }
};