var expect = require('chai').expect;
var Subject = require('../../../server/models/subject');

describe('Subject', function () {
  it('should save attrs from constructor', function () {
    var subject = new Subject({ a: 1 });
    expect(subject.attrs).to.deep.equal({ a: 1 });
  });

  it('should tell it is new', function () {
    var subject = new Subject({ a: 1 });
    expect(subject.isNew()).to.be.ok;
  });

  it('should tell it is not new', function () {
    var subject = new Subject({ id: 'ABCD', a: 1 });
    expect(subject.isNew()).to.not.be.ok;
  });

  it('should validate', function () {
    var subject = new Subject({
      title: 'some title',
      description: 'some description',
      author: 'some author'
    });
    expect(subject.isValid()).to.be.ok;
  });

  it('should not validate', function () {
    var subject = new Subject({ });
    expect(subject.isValid()).to.not.be.ok;
  });
});