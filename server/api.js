var express = require('express');
var app = express();
var storage = require('./storage');

var Subject = require('./models/subject');

module.exports.getSubjects = function (req, res) {
  var subjects = storage.getSubjects();
  res.json(subjects);
};

module.exports.createSubject = function (req, res) {
  var newSubject = new Subject(req.body);
  if (newSubject.isValid()) {
    var subjects = storage.getSubjects();
    var newSubjects = newSubject.saveTo(subjects);
    storage.setSubjects(newSubjects);
    res.status(200).json(newSubject.attrs);
  } else {
    res.status(409).json({ errors: newSubject.validationFailures });
  }
};

module.exports.changeSubject = function (req, res) {
  var subject = storage.findSubject(req.params.id);
  if (subject) {
    subject.setAttrs(req.body);
    if (subject.isValid()) {
      var subjects = storage.getSubjects();
      subject.saveTo(subjects);
      storage.setSubjects(subjects);
      res.status(200).json(subject.attrs);
    } else {
      res.status(409).json({ errors: subject.validationFailures });
    }
  } else {
    res.status(404).end();
  }
};

module.exports.deleteSubject = function (req, res) {
  var subject = storage.findSubject(req.params.id);
  if (subject) {
    var subjects = storage.getSubjects();
    subjects = subject.removeFrom(subjects);
    storage.setSubjects(subjects);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};