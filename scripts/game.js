var GAME = (function (my) {
	window.$ = window.jQuery = require('scripts/jquery-2.1.1.min.js');
	window._ = require('scripts/lodash.min.js');
	
	var remote = require('remote');	
	var browserWindow = remote.getCurrentWindow();
	
	var player = {
		health: 100,
		gold: 50,
		position: { x: 0, y: 0 },
		inventory: []
	}
	
	var map = [
		[1,1,1],
		[1,2,1],
		[1,1,1]
	]
	
	var currentTextElement = function() {
		var textId = map[player.position.x][player.position.y];
		//console.log(sprintf("textId: %d", textId));
		var textElement = _.find(data, function(t) {
			return t.id === textId;
		});
		return textElement;
	}
	
	var data = [
		{
			id: 1,
			text: "You are standing in a grass field"
		},
		{
			id: 2,
			text: "You've stumbled upon a wooden sword",
			items: ["wooden sword"],
			funcs: {
				take: function(e, p, m, arg) {
					var what = _.find(e.items, function(i) {
						return i === arg;
					});
					
					if(what !== undefined) {
						p.inventory.push(what);						
						m[player.position.x][player.position.y]=1;
					}
				}
			}
		}
	]
	
	$(document).keydown(function(e){
		//console.log(e.keyCode);
		if(e.ctrlKey && e.keyCode===68){
			my.toggleDevTools();
		}
		if(e.ctrlKey && e.keyCode===82){
			my.reload();
		}
	});
	
	$(document).ready(function(){
		$("#command").keypress(function(e){
			if(e.keyCode === 13){				
				$("#go").click();
			}
		});
		
		window.setInterval(function() {
			updatePlayerInfo(player);
		}, 500);
	});
	
	var my = {};

	function updatePlayerInfo(player) {
		var playerHtml = sprintf("Health: %d | Gold: %d | Inventory: %s", player.health, player.gold, player.inventory.toString());
		
		var textElement = currentTextElement();
		
		updateContentPanel(textElement.text);
		
		$("#player").html(playerHtml);	
	}

	function updateContentPanel(text) {
		$("#content").html(text);
	}
	
	my.processCommand = function() {
		var command = $("#command");
		var commandText = $("#command").val();
		command.val('');

		if(commandText.length === 0) {
			return;
		}
		
		console.log(sprintf("command entered: %s", commandText));
		
		var commandRe = /(\w+)(.*)/gi;
		var results = commandRe.exec(commandText);
		console.log(results);
		
		if(results === undefined || results.length !== 3) {
			return;
		}
		
		var action = results[1].trim();
		var argument = results[2].trim();
		
		console.log(sprintf("[%s]", argument));
		
		var textElement = currentTextElement();
		
		if (action === 'take') {
			if(textElement.funcs!==undefined && textElement.funcs.take !==undefined){
				textElement.funcs.take(textElement, player, map, argument);
			}
		}
		else if(action === 'go') {
			switch(argument){
				case 'north':
					if(!(player.position.x - 1 < 0)) {
						player.position.x = player.position.x - 1;
					}
				break;
				case 'south':
					if(player.position.x + 1 !== map[1].length) {
						player.position.x = player.position.x + 1;
					}
				break;
				case 'west':
					if(!(player.position.y -1 < 0)){
						player.position.y = player.position.y - 1;
					}
				break;
				case 'east':
					if(player.position.y + 1 !== map[0].length) {
						player.position.y = player.position.y + 1;
					}
				break;
			}
		}
		
		textElement = currentTextElement();
		
		console.log(sprintf("%d, %d", player.position.x, player.position.y));
		updateContentPanel(textElement.text);
	}
	
	my.toggleDevTools = function() {
		browserWindow.toggleDevTools();
	}
	
	my.reload = function() {
		browserWindow.reload();
	}
	
	return my;
}(GAME));