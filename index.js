'use strict';

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client')));

var clients = 0;
io.on('connection', function (socket) {
	clients++;
	console.log('He came');
	socket.emit('newClientConnect', {descript: 'Hello there!'});
	socket.broadcast.emit('newClientConnect', {descript: clients + ' clients connected!'});

	setTimeout(function () {
		socket.emit('newClientConnect', {descript: clients + ' clients connected!'});
	}, 4000);

	socket.on('disconnect', function () {
		clients--;
		console.log('He left');
		socket.broadcast.emit('newClientConnect', {descript: clients + ' clients connected!'})
	});
});

server.listen(port, function () {
	console.log('Listening on port %d', port);
});