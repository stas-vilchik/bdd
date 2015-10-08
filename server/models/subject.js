var shortid = require('shortid'),
    validate = require('../validators');

function Subject(attrs) {
  this.attrs = attrs;
  this.validationFailures = [];
}

Subject.prototype.isNew = function () {
  return this.attrs.id == null;
};

Subject.prototype.isValid = function () {
  this.validationFailures = validate(this.attrs)
      .checkExist('title')
      .checkType('title', 'string')
      .checkExist('description')
      .checkType('description', 'string')
      .checkExist('author')
      .checkType('author', 'string')
      .getFailedChecks();
  return this.validationFailures.length === 0;
};

Subject.prototype.setAttrs = function (newAttrs) {
  var id = this.attrs.id;
  this.attrs = newAttrs;
  this.attrs.id = id;
};

Subject.prototype.saveTo = function (collection) {
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

module.exports = Subject;