var persist = require('node-persist');

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

module.exports.getSubjects = function () {
  return getItem('subjects') || [];
};

module.exports.setSubjects = function (subjects) {
  return setItem('subjects', subjects);
};