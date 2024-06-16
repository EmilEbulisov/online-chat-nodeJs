var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('Server listening on *:3000');
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
