var express = require('express');
var app = express();
var storage = require('./storage');
var errors = require('./exceptions');
var Subject = require('./models/subject');
var BBL = require('./models/bbl');

function wrap(handler) {
  return function (req, res) {
    try {
      var response = handler(req, res);
      if (response != null) {
        res.status(200).json(response);
      } else {
        res.status(204).end();
      }
    }
    catch (e) {
      if (e instanceof errors.NotFoundError) {
        res.status(404).end();
      } else if (e instanceof errors.ConflictError) {
        res.status(409).json({errors: e.errors});
      } else {
        res.status(500).end();
      }
    }
  }
}


function getSubjects() {
  return storage.getSubjects();
}


function createSubject(req) {
  var newSubject = new Subject(req.body);
  if (!newSubject.isValid()) {
    throw new errors.ConflictError(newSubject.validationFailures)
  }

  var subjects = storage.getSubjects();
  var newSubjects = newSubject.saveTo(subjects);
  storage.setSubjects(newSubjects);
  return newSubject.attrs;
}


function changeSubject(req) {
  var subject = storage.findSubject(req.params.id);
  if (!subject) {
    throw new errors.NotFoundError();
  }

  subject.setAttrs(req.body);
  if (!subject.isValid()) {
    throw new errors.ConflictError(subject.validationFailures)
  }

  var subjects = storage.getSubjects();
  subjects = subject.saveTo(subjects);
  storage.setSubjects(subjects);
  return subject.attrs;
}


function deleteSubject(req) {
  var subject = storage.findSubject(req.params.id);
  if (!subject) {
    throw new errors.NotFoundError();
  }
  var subjects = storage.getSubjects();
  subjects = subject.removeFrom(subjects);
  storage.setSubjects(subjects);
  return null;
}


function getBBls() {
  return storage.getBBLs();
}


function createBBL(req) {
  var newBBL = new BBL(req.body);
  if (!newBBL.isValid()) {
    throw new errors.ConflictError(newBBL.validationFailures)
  }

  var bbls = storage.getBBLs();
  var newBBLs = newBBL.saveTo(bbls);
  storage.setBBLs(newBBLs);
  return newBBL.attrs;
}


function changeBBL(req) {
  var bbl = storage.findBBL(req.params.id);
  if (!bbl) {
    throw new errors.NotFoundError();
  }

  bbl.setAttrs(req.body);
  if (!bbl.isValid()) {
    throw new errors.ConflictError(bbl.validationFailures)
  }

  var bbls = storage.getBBLs();
  bbls = bbl.saveTo(bbls);
  storage.setBBLs(bbls);
  return bbl.attrs;
}


function deleteBBL(req) {
  var bbl = storage.findBBL(req.params.id);
  if (!bbl) {
    throw new errors.NotFoundError();
  }
  var bbls = storage.getBBLs();
  bbls = bbl.removeFrom(bbls);
  storage.setBBLs(bbls);
  return null;
}


module.exports.getSubjects = wrap(getSubjects);
module.exports.createSubject = wrap(createSubject);
module.exports.changeSubject = wrap(changeSubject);
module.exports.deleteSubject = wrap(deleteSubject);

module.exports.getBBls = wrap(getBBls);
module.exports.createBBL = wrap(createBBL);
module.exports.changeBBL = wrap(changeBBL);
module.exports.deleteBBL = wrap(deleteBBL);