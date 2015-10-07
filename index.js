var path = require('path');
var express = require('express');
var app = express();

app.use('/scripts', express.static(path.join(__dirname, 'client/scripts')));
app.use('/styles', express.static(path.join(__dirname, 'client/styles')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/views/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});