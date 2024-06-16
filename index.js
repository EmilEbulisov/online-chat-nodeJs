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
connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	
	connections.push(socket);

	
	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	
	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});