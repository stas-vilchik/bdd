var shortid = require('shortid'),
    validate = require('../validators');

function BBL(attrs) {
  this.attrs = attrs;
  this.validationFailures = [];
}

BBL.prototype.isNew = function () {
  return this.attrs.id == null;
};

BBL.prototype.isValid = function () {
  this.validationFailures = validate(this.attrs)
      .checkExist('date')
      .checkType('date', 'string')
      .getFailedChecks();
  return this.validationFailures.length === 0;
};

BBL.prototype.setAttrs = function (newAttrs) {
  var id = this.attrs.id;
  this.attrs = newAttrs;
  this.attrs.id = id;
};

BBL.prototype.saveTo = function (collection) {
  var newCollection = collection.slice(),
      attrs = this.attrs;
  if (this.isNew()) {
    this.attrs.id = shortid.generate();
    newCollection.push(attrs);
  } else {
    var index = collection.findIndex(function (subject) {
      return subject.id === attrs.id;
    });
    newCollection.splice(index, 1, attrs);
  }
  return newCollection;
};

BBL.prototype.removeFrom = function (collection) {
  var newCollection = collection.slice(),
      attrs = this.attrs,
      index = collection.findIndex(function (subject) {
        return subject.id === attrs.id;
      });
  newCollection.splice(index, 1);
  return newCollection;
};

module.exports = BBL;