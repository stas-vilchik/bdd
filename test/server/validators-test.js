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
});