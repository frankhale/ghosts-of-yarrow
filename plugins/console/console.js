module.exports = (function(){
  'use strict';

  var my = {};

  // This won't have a button associated with it so we'll need to
  // attach to a key combo. Will need to also add some functions to
  // show / hide.

  my.init = function(host, templates) {
    var consoleTemplate = _.find(templates, { 'name': 'console.html' });

    host.$contentArea.append(consoleTemplate.data);

    var $content = $("#content");

    my.showConsole = function() {
      if($content.css('display') === 'none') {
        $content.css('display', 'block');
      }
    };

    my.hideConsole = function() {
      if($content.css('display') !== 'none') {
        $content.css('display', 'none');
      }
    };
  };

  my.unload = function() {
    $("#consoleCSS").remove();
  };

  return my;
}());
