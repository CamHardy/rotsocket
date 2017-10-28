'use strict';

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

var clients = 0;
var roomNum = 0;
io.on('connection', function (socket) {
	socket.on('newPlayer', function () {
		socket.player = {
			id: clients++,
			x: randomInt(0, 29),
			y: randomInt(0, 29)
		};
		socket.emit('allPlayers', getAllPlayers());
		socket.broadcast.emit('newPlayer', socket.player);

		socket.on('disconnect', function () {
			io.emit('removePlayer', socket.player);
		});
	});
});

function getAllPlayers() {
	var players = [];
	Object.keys(io.sockets.connected).forEach(function (socketID) {
		var player = io.sockets.connected[socketID].player;
		if (player)
			players.push(player);
	});
	return players;
}

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

server.listen(port, function () {
	console.log('Listening on port %d', port);
});
