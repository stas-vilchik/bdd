var persist = require('node-persist');
var Subject = require('./models/subject');

var isReady = false;

function makeReady() {
  if (!isReady) {
    isReady = true;
    persist.initSync();
  }
}

function setItem() {
  makeReady();
  return persist.setItem.apply(persist, arguments);
}

function getItem() {
  makeReady();
  return persist.getItem.apply(persist, arguments);
}

function getSubjects () {
  return getItem('subjects') || [];
}

function setSubjects (subjects) {
  return setItem('subjects', subjects);
}

function findSubject (id) {
  var subjects = getSubjects(),
      subject = subjects.find(function (subject) {
        return subject.id === id;
      });
  return subject ? new Subject(subject) : null;
}

module.exports.getSubjects = getSubjects;
module.exports.setSubjects = setSubjects;
module.exports.findSubject = findSubject;