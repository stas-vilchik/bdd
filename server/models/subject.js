var _ = require('underscore');
var shortid = require('shortid');
var storage = require('../storage');
var errors = require('../exceptions');
var validate = require('../validators');

function Subject (attrs) {
  this.attrs = attrs;
  this.validationFailures = [];
}

Subject.all = function () {
  return storage.getSubjects();
};

Subject.find = function (id) {
  var subjects = storage.getSubjects(),
      attrs = _.findWhere(subjects, { id: id });
  return attrs ? new Subject(attrs) : null;
};

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
      .checkCustom(function (attrs) {
        if (attrs.bbl) {
          var bbls = storage.getBBLs();
          return !!_.findWhere(bbls, { id: attrs.bbl });
        }
        return true;
      })
      .getFailedChecks();
  return this.validationFailures.length === 0;
};

Subject.prototype.setAttrs = function (newAttrs) {
  var id = this.attrs.id;
  this.attrs = newAttrs;
  this.attrs.id = id;
  return this;
};

Subject.prototype.save = function () {
  if (!this.isValid()) {
    throw new errors.BadRequest(this.validationFailures);
  }
  var subjects = storage.getSubjects().slice();
  if (this.isNew()) {
    this.attrs.id = shortid.generate();
    subjects.push(this.attrs);
    storage.setSubjects(subjects);
  } else {
    _.extend(_.findWhere(subjects, { id: this.attrs.id }), this.attrs);
    storage.setSubjects(subjects);
  }
  storage.setSubjects(subjects);
  return this;
};

Subject.prototype.remove = function () {
  if (this.isNew()) {
    throw new errors.ConflictError();
  }
  var id = this.attrs.id;
  var subjects = storage.getSubjects().slice();
  subjects = _.reject(subjects, function (subject) {
    return subject.id === id;
  });
  storage.setSubjects(subjects);
  return this;
};

module.exports = Subject;