module.exports = (function() {
  'use strict';

  var my = {};

  my.init = function(host, templates) {
    var startScreenContent = _.find(templates, {
      'name': 'startScreen.html'
    });

    host.$contentArea.append(startScreenContent.data);

    var $startScreen = $("#startScreen");

    // For now we just fade the screen out but this won't
    // do this in the future. We'll have a button or link
    // for starting or loading a game.
    window.setTimeout(function() {
      $startScreen.fadeOut("slow", function() {
        host.$mainUI.fadeIn("fast");
      });
    }, 5000);

    my.showStartScreen = function() {
      if ($startScreen.css('display') === 'none') {
        host.$mainUI.css('display', 'none');
        $startScreen.css('display', 'block');
      }
    };

    my.hideStartScreen = function() {
      if ($startScreen.css('display') !== 'none') {
        $startScreen.css('display', 'none');
        host.$mainUI.css('display', 'block');
      }
    };
  };

  my.unload = function() {
    $("#startScreen").remove();
    $("#startScreenCSS").remove();
  };

  return my;
}());
