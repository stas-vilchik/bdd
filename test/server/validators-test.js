var expect = require('chai').expect;
var validate = require('../../server/validators');

describe('Validators', function () {
  it('starts with no failures', function () {
    var failures = validate({}).getFailedChecks();
    expect(failures).to.be.empty;
  });

  it('should pass some checks', function () {
    var failures = validate({ a: 1 })
        .checkExist('a')
        .checkType('a', 'number')
        .getFailedChecks();
    expect(failures).to.be.empty;
  });

  it('should not pass existence check', function () {
    var failures = validate({ a: 1 })
        .checkExist('b')
        .getFailedChecks();
    expect(failures).to.have.length(1);
  });

  it('should not pass type check', function () {
    var failures = validate({ a: 1 })
        .checkType('a', 'string')
        .getFailedChecks();
    expect(failures).to.have.length(1);
  });

  it('should not pass several checks', function () {
    var failures = validate({ a: 1 })
        .checkType('a', 'string')
        .checkExist('b')
        .getFailedChecks();
    expect(failures).to.have.length(2);
  });
});