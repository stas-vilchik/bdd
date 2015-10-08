var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./api');

function createServer(port) {
  app.use(bodyParser.json());

  app.use('/scripts', express.static(path.join(__dirname, '../client/scripts')));
  app.use('/styles', express.static(path.join(__dirname, '../client/styles')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/index.html'));
  });

  app.get('/api/subjects', api.getSubjects);
  app.post('/api/subjects', api.createSubject);
  app.put('/api/subjects/:id', api.changeSubject);
  app.delete('/api/subjects/:id', api.deleteSubject);

  app.get('/api/bbls', api.getBBls);
  app.post('/api/bbls', api.createBBL);
  app.put('/api/bbls/:id', api.changeBBL);
  app.delete('/api/bbls/:id', api.deleteBBL);

  return app.listen(port, function () {
    console.log('Example app listening at %s', port);
  });
}

module.exports = createServer;