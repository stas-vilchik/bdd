var persist = require('node-persist');
var Subject = require('./models/subject');
var BBL = require('./models/bbl');

var isReady = false;

function makeReady(options) {
  if (!isReady) {
    isReady = true;
    persist.initSync(options);
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

function getSubjects() {
  return getItem('subjects') || [];
}

function setSubjects(subjects) {
  return setItem('subjects', subjects);
}

function findSubject(id) {
  var subjects = getSubjects(),
      subject = subjects.find(function (subject) {
        return subject.id === id;
      });
  return subject ? new Subject(subject) : null;
}

function clearSubjects() {
  setSubjects([]);
}

function getBBLs() {
  return getItem('bbls') || [];
}

function setBBLs(bbls) {
  return setItem('bbls', bbls);
}

function findBBL(id) {
  var bbls = getBBLs(),
      bbl = bbls.find(function (bbl) {
        return bbl.id === id;
      });
  return bbl ? new BBL(bbl) : null;
}

function clearBBLs() {
  setBBLs([]);
}

module.exports.init = makeReady;
module.exports.getSubjects = getSubjects;
module.exports.setSubjects = setSubjects;
module.exports.findSubject = findSubject;
module.exports.clearSubjects = clearSubjects;
module.exports.getBBLs = getBBLs;
module.exports.setBBLs = setBBLs;
module.exports.findBBL = findBBL;
module.exports.clearBBLs = clearBBLs;