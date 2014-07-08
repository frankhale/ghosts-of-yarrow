var Yarrow = (function (my) {
	"use strict"; 
	
	my.items = [
		{
			id: 1,
			name: "wooden sword",
			type: "weapon",
			strength: 2
		},
		{
			id: 2,
			name: "magic hammer",
			type: "weapon",
			strength: 20,
			special: "A shock wave is sent towards the enemy dealing a heavy blow!"
		}
	];
	
	//my.enemies = [
	//	{
	//		id: 1,
	//		name: "sabretooth frog",
	//		health: 20,
	//		strength: 2
	//	}
	//]
	
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
	
	my.init = function(p) {
		var magicHammer = _.find(my.items, function(i) {
			return i.name === "magic hammer";
		});
		p.inventory.push(magicHammer);
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
			items: [1],
			funcs: {
				take: function(e, p, m, arg) {
					var what = _.find(e.items, function(i) {
						return i.name === arg;
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
					
					var magicHammer = _.find(my.items, function(i) {
						return i.name === "magic hammer";
					});
					
					p.inventory.push(magicHammer);
					
					u("You received 50 gold pieces and a magic hammer, congratulations!");
					m[p.position.x][p.position.y]=1; // changes the tile for this location on the map
				}
			}
		},
		{
			id: 4,
			health: 20,
			text: function() {
				return getTextForLocation(this.id);
			},
			funcs: {
				use: function(e, p, m, arg, u) {
					var what = _.find(my.items, function(i) {
						return i.name === arg;
					});
					
					if(what !== undefined) {
						var r = Math.floor((Math.random() * 10) + 1);
						var lostHP = (r * what.strength);
						e.health -= lostHP;
						
						//console.log("enemies health: " + e.health);
						
						if(what.special !== undefined) {
							u(what.special);
						}
						
						u(sprintf("<span class='success'>You attacked and the enemy lost %d health</span>", lostHP));
						
						if(e.health <= 0) {
							var reward = Math.floor((Math.random() * 20) + 10) * what.strength;
							p.gold += reward;
							u(sprintf("<span class='success'><strong>You've killed the enemy and received %d gold pieces</strong></span>", reward));
							m[p.position.x][p.position.y]=1; // changes the tile for this location on the map
						}
					}
				},
				ambush: function(e, p, m, u) {
					if(e.health > 0) {
						var r = Math.floor((Math.random() * 10) + 1);
						var lostHP = (r * 2);
						
						if(p.health - lostHP <= 0) {
							u("<span class='alert'>You have succumb to the injuries inflicted to you by the monster and have died.</span>");
							p.health = 0;
						} else {
							p.health -= lostHP;
							u(sprintf("<span class='alert'>You were attacked and lost %d health</span>", lostHP));
						}
					}
				}
			}
		}
	]
	
	return my;
}(Yarrow || {}));