var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var storage = require('./storage');
var api = require('./api');

function createServer (port) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Assets
  app.use('/scripts', express.static(path.join(__dirname, '../client/scripts')));
  app.use('/styles', express.static(path.join(__dirname, '../client/styles')));

  // Main Page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/index.html'));
  });

  // API Routing
  var router = express.Router();
  app.use('/api', router);
  router.use(function (req, res, next) {
    console.log(req.method.toUpperCase(), req.originalUrl);
    next();
  });
  router.route('/subjects')
      .get(api.getSubjects)
      .post(api.createSubject);
  router.route('/subjects/:id')
      .put(api.changeSubject)
      .delete(api.deleteSubject);
  router.route('/bbls')
      .get(api.getBBls)
      .post(api.createBBL);
  router.route('/bbls/:id')
      .put(api.changeBBL)
      .delete(api.deleteBBL);

  // Storage
  storage.init();

  return app.listen(port, function () {
    console.log('Example app listening at %s', port);
  });
}

module.exports = createServer;