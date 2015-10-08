function Validator(attrs) {
  this.attrs = attrs;
  this.successfulChecks = [];
  this.failedChecks = [];
  return this;
}

Validator.prototype.checkExist = function (field) {
  if (this.attrs[field] != null) {
    this.successfulChecks.push({ check: 'exist', field: field });
  } else {
    this.failedChecks.push({ check: 'exist', field: field });
  }
  return this;
};

Validator.prototype.checkType = function (field, type) {
  if (typeof this.attrs[field] === type) {
    this.successfulChecks.push({ check: 'type', field: field, type: type });
  } else {
    this.failedChecks.push({ check: 'type', field: field, type: type });
  }
  return this;
};

Validator.prototype.checkOnlyFields = function (fields) {
  var currentFields = Object.keys(this.attrs),
      pass = currentFields.length === fields.length;
  fields.forEach(function (field) {
    if (currentFields[field] == null) {
      pass = false;
    }
  });
  if (pass) {
    this.successfulChecks.push({ check: 'only', fields: fields });
  } else {
    this.failedChecks.push({ check: 'only', fields: fields });
  }
  return this;
};

Validator.prototype.getFailedChecks = function () {
  return this.failedChecks.slice();
};

module.exports = function (attrs) {
  return new Validator(attrs);
};