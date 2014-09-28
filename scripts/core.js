// The Ghosts of Yarror
//
// Frank Hale <frankhale@gmail.com>
// 28 Sept 2014

var APP = (function(my) {
  'use strict';

  var remote = require('remote'),
    fs = require('fs'),
    //path = require('path'),
    browser = remote.getCurrentWindow();

  var $contentArea = $("#contentArea"),
    $topBar = $("#topBar"),
    $topBarContent = $("#topBarContent"),
    $topBarLeftButtons = $("#topBarLeftButtons"),
    $topBarRightButtons = $("#topBarRightButtons"),
    $mainContent = $("#mainContent"),
    $mainUI = $("#mainUI"),
    $bottomBar = $("#bottomBar"),
    $commandText = $("#commandText");

  var $devToolsButton = $("#devToolsButton"),
    $reloadButton = $("#reloadButton");

  var pluginsDirectory = process.cwd() + "\\resources\\app\\plugins",
    plugins = [],
    pluginsFinishedLoadingCallbacks = [],
    processCommandCallbacks = [];

  var player = {
    name: "Player 1",
    health: 25,
    mp: 25,
    stamina: 25,
    gold: 50,
    position: {
      x: 0,
      y: 0
    },
    inventory: [],
    capacity: 50,
    companions: [],
    quests: {
      current: 0,
      info: []
    },
    stats: {
      crimes: [],
      kills: {
        assasinations: {},
        other: {}
      },
      "locks-picked": {},
      "break-ins": {},
      "trespasses": {},
      "completed-quests": []
    }
  }

  var maps = [], // an array of objects that describe the map and also define it
    data = []; // an array of objects that describe the data and also define it

  var movePlayer = function(map, player, arg) {
    // This doesn't yet take into consideration areas of the map that cannot be navigated to like water, walls, etc..
    // switch(arg){
    //   case 'north':
    //     if(!(player.position.x - 1 < 0)) {
    //       player.position.x = player.position.x - 1;
    //     }
    //   break;
    //   case 'south':
    //     if(player.position.x + 1 !== map[1].length) {
    //       player.position.x = player.position.x + 1;
    //     }
    //   break;
    //   case 'west':
    //     if(!(player.position.y -1 < 0)){
    //       player.position.y = player.position.y - 1;
    //     }
    //   break;
    //   case 'east':
    //     if(player.position.y + 1 !== map[0].length) {
    //       player.position.y = player.position.y + 1;
    //     }
    //   break;
    // }
  };

  var processCommand = function(text) {
    _.forEach(processCommandCallbacks, function(cb) {
      cb(text);
    });
  };

  var getCurrentTextElement = function() {
    // var textId = map[player.position.x][player.position.y];
    // var textElement = _.find(my.data, function(t) {
    //   return t.id === textId;
    // });
    //
    // return textElement;
  }

  my.$contentArea = $contentArea;
  my.$topBar = $topBar;
  my.$topBarContent = $topBarContent;
  my.$mainContent = $mainContent;
  my.$topBarLeftButtons = $topBarLeftButtons;
  my.$topBarRightButtons = $topBarRightButtons;
  my.$mainUI = $mainUI;
  my.$bottomBar = $bottomBar;
  my.plugins = plugins;
  my.player = player;
  my.map = map;
  my.getCurrentTextElement = getCurrentTextElement;

  my.init = function() {
    $devToolsButton.click(function() {
      my.toggleDevTools();
    });
    $reloadButton.click(function() {
      my.reload();
    });

    var files = fs.readdirSync(pluginsDirectory); // change to async

    _.forEach(files.sort(), function(f) {
      my.loadPlugin(f);

      if (plugins.length === files.length) {
        _.forEach(pluginsFinishedLoadingCallbacks, function(cb) {
          cb();
        })

        $commandText.keypress(function(e) {
          if (e.keyCode === 13) {
            processCommand($commandText.val());
          }
        });
      }
    });
  };

  my.registerCallbackForPluginsFinishedLoaded = function(callback) {
    pluginsFinishedLoadingCallbacks.push(callback);
  };

  my.registerCallbackForProcessCommand = function(callback) {
    processCommandCallbacks.push(callback);
  };

  my.toggleDevTools = function() {
    browser.toggleDevTools();
  };

  my.reload = function() {
    browser.reload();
  };

  // I think the plugin loader can start using the asynchronous file IO
  // functions instead of the synchronous ones.
  my.loadPlugin = function(name) {
    var fpath = pluginsDirectory + "\\" + name;
    var manifestPath = fpath + "\\manifest.json";
    var templatesPath = fpath + "\\templates";
    var stats = fs.statSync(fpath); // change to async

    if (stats.isDirectory() && fs.existsSync(manifestPath)) {
      var data = fs.readFileSync(manifestPath); // change to async
      var manifest = JSON.parse(data);

      if (('main' in manifest) && (('enabled' in manifest) || ('core' in manifest))) {
        plugins.push(manifest);

        var cssPath = "./plugins/" + name + "/" + manifest.css;
        var jsPath = "./plugins/" + name + "/" + manifest.main;
        var templates = [];

        if (fs.existsSync(templatesPath)) {
          var templateFiles = fs.readdirSync(templatesPath); // change to async

          _.forEach(templateFiles, function(tf) {
            var templateData = fs.readFileSync(templatesPath + "\\" + tf, 'utf8'); // change to async
            templates.push({
              name: tf,
              "data": templateData
            });
          });
        }

        manifest.templates = templates;

        if (manifest.enabled || manifest.core) {
          if (manifest.css) {
            $("<link id='" + manifest.name + "CSS' rel='stylesheet' type='text/css' href='" + cssPath + "'/>").appendTo("head");
          }
          var p = require(jsPath);
          p.init(APP, templates);
          manifest.pluginInstance = p;
        }
      }
    }
  };

  return my;
}(APP || {}));

$(document).ready(function() {
  APP.init();
});
