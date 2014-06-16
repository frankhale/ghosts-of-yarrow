var GAME = (function (my) {
	//window.$ = window.jQuery = require('scripts/jquery-2.1.1.min.js');

	var remote = require('remote');
	var browserWindow = remote.getCurrentWindow();
	
	var my = {};

	my.go = function() {
	}
	
	my.toggleDevTools = function() {
		browserWindow.toggleDevTools();
	}
	
	my.reload = function() {
		browserWindow.reload();
	}
	
	return my;
}(GAME));