// This is the main game data of Ghosts of Yarrow
//
// Frank Hale <frankhale@gmail.com>
// 28 September 2014

module.exports = (function() {
  'use strict';

  var my = {};

  var items = {
      weapons: [],
      armor: [],
      food: [],
      potions: [],
      ingredients: [],
      scrolls: [],
      books: [],
      keys: [],
      other: []
    },
    enchantments = {},
    enemies = {},
    locations = {},
    data = [];

  function addWeapon(name, type, weight, rating, enchantment) {
    items.weapons.push({
      name: name,
      type: type,
      weight: weight,
      rating: rating,
      enchantment: enchantment
    });
  }

  function addArmor(name, type, weight, rating, enchantment) {
    items.armor.push({
      name: name,
      type: type,
      weight: weight,
      rating: rating,
      enchantment: enchantment
    });
  }

  function declareCoreWeapons() {
    // Iron
    addWeapon("Iron Dagger", "iron", 1, 1, null);
    addWeapon("Iron Sword", "iron", 2, 2, null);
    addWeapon("Iron Axe", "iron", 2, 2, null);
    addWeapon("Iron Greatsword", "iron", 4, 3, null);
    addWeapon("Iron Great Axe", "iron", 5, 4, null);
    addWeapon("Iron Hammer", "iron", 2, 6);

    // Wooden
    addWeapon("Hunting Bow", "wooden", 2, 2, null);
    addWeapon("Club", "wooden", 2, 3, null);
    addWeapon("Blunted Mallet", "wooden", 2, 4, null);

    // Leather
    addWeapon("Leather Braided Assasin Wire", "leather", 1, 5, null);

    // Steel
    addWeapon("Steel Dagger", "steel", 3, 2, null);
    addWeapon("Steel Sword", "steel", 4, 3, null);
    addWeapon("Steel Axe", "steel", 4, 3, null);
    addWeapon("Steel Greatsword", "steel", 6, 4, null);
    addWeapon("Steel Great Axe", "steel", 7, 5, null);
    addWeapon("Steel Hammer", "steel", 4, 8);
    addWeapon("Steel Braided Assasin Wire", "steel", 1, 10, null);

    // Titanium
    addWeapon("Titanium Dagger", "titanium", 2, 4, null);
    addWeapon("Titanium Sword", "titanium", 3, 6, null);
    addWeapon("Titanium Axe", "titanium", 3, 6, null);
    addWeapon("Titanium Greatsword", "titanium", 5, 8, null);
    addWeapon("Titanium Great Axe", "titanium", 6, 10, null);
    addWeapon("Titanium Hammer", "titanium", 6, 12, null);
    addWeapon("Titanium Braided Assasin Wire", "titanium", 1, 15, null);

    // Glass
    addWeapon("Glass Dagger", "glass", 2, 12, null);
    addWeapon("Glass Sword", "glass", 3, 13, null);
    addWeapon("Glass Axe", "glass", 3, 13, null);
    addWeapon("Glass Greatsword", "glass", 5, 14, null);
    addWeapon("Glass Great Axe", "glass", 6, 15, null);
    addWeapon("Glass Hammer", "glass", 6, 18, null);
    addWeapon("Glass Fiber Braided Assasin Wire", "glass", 1, 18, null);

    // Mystic
    addWeapon("Mystic Dagger", "mystic", 2, 12, null);
    addWeapon("Mystic Sword", "mystic", 3, 13, null);
    addWeapon("Mystic Axe", "mystic", 3, 13, null);
    addWeapon("Mystic Greatsword", "mystic", 5, 14, null);
    addWeapon("Mystic Great Axe", "mystic", 6, 15, null);
    addWeapon("Mystic Braided Assasin Wire", "mystic", 1, 22, null);
  }

  function declareCoreArmor() {
    // There are Oblivion/Skyrim overtones in here, LOL! There will be some
    // of that but there will be deviations!

    // Leather
    addWeapon("Leather Boots", "leather", 0, 0, null);
    addWeapon("Leather Armor", "leather", 0, 0, null);
    addWeapon("Leather Sheild", "leather", 0, 0, null);
    addWeapon("Leather Bracers", "leather", 0, 0, null);
    addWeapon("Leather Mask", "leather", 0, 0, null);
    addWeapon("Leather Hood", "leather", 0, 0, null);
    addWeapon("Leather Backpack", "leather", 0, 0, null);
    addWeapon("Leather Sling Pouch", "leather", 0, 0, null);
    addWeapon("Leather Gloves", "iron", 0, 0, null);

    // Iron
    addWeapon("Iron Boots", "iron", 0, 0, null);
    addWeapon("Iron Armor", "iron", 0, 0, null);
    addWeapon("Iron Sheild", "iron", 0, 0, null);
    addWeapon("Iron Bracers", "iron", 0, 0, null);
    addWeapon("Iron Helmet", "iron", 0, 0, null);
    addWeapon("Iron Gloves", "iron", 0, 0, null);

    // Steel
    addWeapon("Steel Boots", "steel", 0, 0, null);
    addWeapon("Steel Armor", "steel", 0, 0, null);
    addWeapon("Steel Sheild", "steel", 0, 0, null);
    addWeapon("Steel Bracers", "steel", 0, 0, null);
    addWeapon("Steel Helmet", "steel", 0, 0, null);
    addWeapon("Steel Gloves", "steel", 0, 0, null);

    // Titanium
    addWeapon("Titanium Boots", "titanum", 0, 0, null);
    addWeapon("Titanium Armor", "titanum", 0, 0, null);
    addWeapon("Titanium Sheild", "titanum", 0, 0, null);
    addWeapon("Titanium Bracers", "titanum", 0, 0, null);
    addWeapon("Titanium Helmet", "titanum", 0, 0, null);
    addWeapon("Titanium Gloves", "titanum", 0, 0, null);
  }

  function declareCoreMagic() {

  }

  function declareCorePotions() {

  }

  my.init = function(host, templates) {
    declareCoreWeapons();
    declareCoreArmor();
    declareCoreMagic();
    declareCorePotions();
  };

  my.unload = function() {};

  return my;
}());
