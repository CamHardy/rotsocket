'use strict';

var Client = {};

Client.socket = io.connect();

Client.connectNewPlayer = () => {
	Client.socket.emit('newPlayer');
}

Client.socket.on('newPlayer', function (data) {
	Game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('allPlayers', function (data) {
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		Game.addNewPlayer(data[i].id, data[i].x, data[i].y);
	}
});

Client.socket.on('removePlayer', function (data) {
	Game.removePlayer(data.id, data.x, data.y);
});