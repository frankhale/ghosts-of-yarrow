var Yarrow = (function (my) {
	"use strict"; 
	
	my.locations = [
		{ id: 1, text: "You are standing in a grass field" },
		{ id: 2, text: "You've stumbled upon a wooden sword" },
		{ id: 3, text: "WOW! You made it to the other side of the world. YAY!" },
		{ id: 4, text: "You've encountered a vicious rabbid sabretooth frog" }
	]
	
	var getTextForLocation = function(id) {
		var loc = _.find(my.locations, function(l) {
			if(l.id === id) {
				return l;
			}
		});
		
		return loc.text;
	};
	
	my.data = [
		{
			id: 1,
			text: function() { 
				return getTextForLocation(this.id);
			}
		},
		{
			id: 2,
			text: function() {
				return getTextForLocation(this.id);
			},
			items: ["wooden sword"],
			funcs: {
				take: function(e, p, m, arg) {
					var what = _.find(e.items, function(i) {
						return i === arg;
					});
					
					if(what !== undefined) {
						p.inventory.push(what);						
						m[p.position.x][p.position.y]=1; // changes the tile for this location on the map
					}
				}
			}
		},
		{
			id: 3,
			text: function() {
				return getTextForLocation(this.id);
			},
			funcs: {
				init: function(p, m, u) {
					p.gold += 50;
					p.inventory.push("magic hammer");
					u("You received 50 gold pieces and a magic hammer, congratulations!");
					m[p.position.x][p.position.y]=1; // changes the tile for this location on the map
				}
			}
		},
		{
			id: 4,
			health: 20,
			items: ["wooden sword"],
			text: function() {
				return getTextForLocation(this.id);
			},
			funcs: {
				use: function(e, p, m, arg, u) {
					var what = _.find(e.items, function(i) {
						return i === arg;
					});
					
					if(what !== undefined) {
						var r = Math.floor((Math.random() * 10) + 1);
						var lostHP = (r * 2);
						e.health -= lostHP;
						
						console.log("enemies health: " + e.health);
						
						u(sprintf("You attacked and the enemy lost %d health", lostHP));
						
						if(e.health <= 0) {
							var reward = Math.floor((Math.random() * 20) + 1) * 2;
							p.gold += reward;
							u(sprintf("You've killed the enemy and received %d gold pieces", reward));
							m[p.position.x][p.position.y]=1; // changes the tile for this location on the map
						}
					}
				},
				ambush: function(p, m, u) {
					var r = Math.floor((Math.random() * 10) + 1);
					var lostHP = (r * 2);
					
					if(p.health - lostHP <= 0) {
						u("You have succumb to the injuries inflicted to you by the monster and have died.");
						p.health = 0;
					} else {
						p.health -= lostHP;
						u(sprintf("You were attacked and lost %d health", lostHP));
					}
				}
			}
		}
	]
	
	return my;
}(Yarrow || {}));