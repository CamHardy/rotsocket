'use strict';

var Game = {};

Game.init = () => {
	this.options = {
		fontFamily: 'Fira Mono',
		fontSize: 10,
		width: 30,
		height: 30,
		forceSquareRatio: true
	}

	this.display = new ROT.Display(options);
	window.onload = function () {
		document.getElementById('game').appendChild(display.getContainer());
	};
	Client.connectNewPlayer();
};

Game.addNewPlayer = (id, x, y) => {
	//TODO: create a player object and store it in an array
	display.draw(x, y, '@');
};

Game.removePlayer = (id, x, y) => {
	display.draw(x, y, '');
};

Game.init();
