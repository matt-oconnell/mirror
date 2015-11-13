var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/templates/input.html');
});

app.get('/output', function(req, res) {
	res.sendFile(__dirname + '/public/templates/output.html');
});

app.get('/orient', function(req, res) {
	res.sendFile(__dirname + '/public/templates/orient.html');
});

io.on('connection', function(socket) {
	socket.on('coords', function(msg) {
		io.emit('coords', msg);
	});
	socket.on('orient', function(msg) {
		io.emit('orient', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});