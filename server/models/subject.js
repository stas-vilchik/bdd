var shortid = require('shortid');

function Subject(attrs) {
  this.attrs = attrs;
}

Subject.prototype.isNew = function () {
  return this.attrs.id !== null;
};

Subject.prototype.isValid = function () {
  return true;
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