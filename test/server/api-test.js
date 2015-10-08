var superagent = require('superagent');
var expect = require('chai').expect;
var server = require('../../server/server');
var storage = require('../../server/storage');

var port = 3007,
    baseUrl = 'http://localhost:' + port;

describe('API', function () {
  var app;

  before(function () {
    app = server(port);
    storage.init({
      dir: '../persist'
    });
  });

  after(function () {
    app.close();
  });

  beforeEach(function () {
    storage.clearSubjects();
  });

  it('should list subjects', function (done) {
    storage.setSubjects([{id: 'a'}, {id: 'b'}]);
    superagent.get(baseUrl + '/api/subjects').end(function (err, res) {
      expect(err).to.not.be.ok;
      expect(res.status).to.equal(200);
      var results = JSON.parse(res.text);
      expect(results).to.deep.equal([{id: 'a'}, {id: 'b'}]);
      done();
    });
  });

  it('should create and return subject', function (done) {
    var attrs = {title: 'title', description: 'description', author: 'author'};
    superagent.post(baseUrl + '/api/subjects', attrs).end(function (err, res) {
      expect(err).to.not.be.ok;
      expect(res.status).to.equal(200);
      var results = JSON.parse(res.text);
      expect(results.id).to.be.ok;
      expect(results.title).to.equal(attrs.title);
      expect(results.description).to.equal(attrs.description);
      expect(results.author).to.equal(attrs.author);
      done();
    });
  });

  it('should change subject', function (done) {
    storage.setSubjects([{id: 'id', title: 'title', description: 'description', author: 'author'}]);
    superagent.put(
        baseUrl + '/api/subjects/id',
        {title: 'another title', description: 'another description', author: 'another author'})
        .end(function (err, res) {
          expect(err).to.not.be.ok;
          expect(res.status).to.equal(200);
          var results = JSON.parse(res.text);
          expect(results.id).to.equal('id');
          expect(results.title).to.equal('another title');
          expect(results.description).to.equal('another description');
          expect(results.author).to.equal('another author');
          done();
        });
  });

  it('should delete subject', function (done) {
    storage.setSubjects([{id: 'id', title: 'title', description: 'description', author: 'author'}]);
    superagent.del(baseUrl + '/api/subjects/id').end(function (err, res) {
      expect(err).to.not.be.ok;
      expect(res.status).to.equal(204);
      done();
    });
  });

  it('should not found subject', function (done) {
    superagent.del(baseUrl + '/api/subjects/nonexistend').end(function (err, res) {
      expect(res.status).to.equal(404);
      done();
    });
  });
});