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
  this.attrs = newAttrs;
};

Subject.prototype.saveTo = function (collection) {
  if (this.isNew()) {
    this.attrs.id = shortid.generate();
  }
  var newCollection = collection.slice();
  newCollection.push(this.attrs);
  return newCollection;
};

module.exports = Subject;