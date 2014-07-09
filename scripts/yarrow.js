var Yarrow = (function (my) {
	"use strict"; 
	
	var remote = require('remote');	
	var browserWindow = remote.getCurrentWindow();
	
	var my = {};
	
	var player = {
		health: 100,
		mp: 50,
		gold: 50,
		position: { x: 0, y: 0 },
		inventory: []
	}
	
	var map = [
		[1,1,3],
		[4,2,1],
		[1,1,1]
	]

	var currentTextElement = function() {
		var textId = map[player.position.x][player.position.y];
		var textElement = _.find(my.data, function(t) {
			return t.id === textId;
		});
	
		return textElement;
	}
	
	var updatePlayerInfo = function(player) {
		var items = _.pluck(player.inventory, 'name');
	
		var playerHtml = sprintf("Health: %d | Gold: %d | Inventory: %s", player.health, player.gold, items.toString());
				
		$("#player").html(playerHtml);	
	};

	var updateContentPanel = function(text) {		
		$("#content").html(text);
	};
	
	var appendInfoPanel = function(text) {
		var $info = $("#info");
		
		$info.append(sprintf("%s</br>", text));
		$info.scrollTop($info.prop("scrollHeight"));
	};
	
	var movePlayer = function(map, player, arg) {
		// This doesn't yet take into consideration areas of the map that cannot be navigated to like water, walls, etc..
		switch(arg){
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
	};
	
	$(document).keydown(function(e){
		if(e.ctrlKey && e.keyCode===68){ // D
			my.toggleDevTools();
		}
		if(e.ctrlKey && e.keyCode===82){ // R
			my.reload();
		}
	});
	
	$(document).ready(function(){
		var $command = $("#command");
		var $go = $("#go");
	
		$command.keypress(function(e){
			if(e.keyCode === 13){				
				$go.click();
			}
		});
		
		my.init(player);
		
		var textElement = currentTextElement();
		updateContentPanel(textElement.text());
		
		window.setInterval(function() {
			updatePlayerInfo(player);
			
			// This is silliness! 
			textElement = currentTextElement();
			updateContentPanel(textElement.text());
			
			if(!($command.attr('disabled') && $go.attr('disabled'))) {
				if(player.health === 0) {
					console.log("disabling controls");
					$command.attr('disabled', true);
					$go.attr('disabled', true);
					appendInfoPanel("<strong>PRESS CTRL+R TO RESTART GAME</strong>");
				}
			}
		}, 500);
	});
	
	// -- Exported functions
	
	// processCommand has to be rethought out, this is crazy and doesn't work the way I actually need it to.	
	my.processCommand = function() {
		var command = $("#command");
		var commandText = $("#command").val();
		command.val('');

		if(commandText.length === 0) {
			return;
		}
		
		var commandRe = /(\w+)(.*)/gi;
		var results = commandRe.exec(commandText);
		
		if(results === undefined || results.length !== 3) {
			return;
		}
		
		var action = results[1].trim();
		var argument = results[2].trim();
		var textElement = currentTextElement();
		
		if (action === 'take') {
			if(textElement.funcs!==undefined && textElement.funcs.take !== undefined){
				appendInfoPanel("you issued the take command");
				
				textElement.funcs.take(textElement, player, map, argument, function(t) {
					appendInfoPanel(t);
				});
				textElement = currentTextElement();
				updateContentPanel(textElement.text());
			}
		}
		else if(action === 'use') {
			if(textElement.funcs!==undefined && textElement.funcs.use !== undefined){
				var hasItem = _.find(player.inventory, function(i) {
					if(i.name === argument) {
						return i;
					}
				});
				
				if(hasItem !== undefined) {
					textElement.funcs.use(textElement, player, map, argument, function(t) {
						//console.log("appending: " + t);
						appendInfoPanel(t);
					});
				} else {
					appendInfoPanel("You do not have item you are trying to use");
				}
			}
		}
		else if(action === 'go') {
			switch(argument){
				case 'north':
				case 'south':
				case 'west':
				case 'east':					
					movePlayer(map, player, argument);
					textElement = currentTextElement();
					updateContentPanel(textElement.text());
					appendInfoPanel(sprintf("<i>You traveled: %s</i>", argument));
				break;
			}
		} else {
			// A command was issued and there were no handlers for it
			appendInfoPanel(sprintf("<i>I don't understand how to: %s</i>", commandText));
		}
		
		if(textElement.funcs!==undefined) {			
			if(textElement.funcs.init !== undefined) {
				textElement.funcs.init(player, map, function(t) {
					appendInfoPanel(t);
				});
				textElement.funcs.init = undefined;		
			} else if (textElement.funcs.ambush !== undefined) {
				textElement.funcs.ambush(textElement, player, map, function(t) {
					appendInfoPanel(t);
				});
			}
		}
	}
	
	my.toggleDevTools = function() {
		browserWindow.toggleDevTools();
	}
	
	my.reload = function() {
		browserWindow.reload();
	}
	
	return my;
}(Yarrow || {}));
