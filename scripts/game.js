var GAME = (function (my) {
	window.$ = window.jQuery = require('scripts/jquery-2.1.1.min.js');

	var remote = require('remote');
	var Menu = remote.require('menu');
	var MenuItem = remote.require('menu-item');
	var browserWindow = remote.getCurrentWindow();
	
	var menuTemplate = [
		{
			label: "Developer",
			submenu: [
				{
					label: 'Toggle Dev Tools',
					click: function() { my.toggleDevTools(); }
				},
				{
					label: 'Reload',
					click: function() { my.reload(); }				
				}
			]
		}
	];
	
	var devMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(devMenu);	
	
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