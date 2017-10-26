'use strict';

var socket = io();

socket.on('newClientConnect', function (data) {
	document.body.innerHTML = '';
	document.write(data.descript);
});