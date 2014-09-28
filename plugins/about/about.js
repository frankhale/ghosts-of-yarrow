module.exports = (function(){
  'use strict';

  var my = {};

  my.init = function(host, templates) {
    var showAboutButton = _.find(templates, { 'name': 'showAboutButton.html' }),
        aboutContent = _.find(templates, { 'name': 'about.html' });

    host.$topBarLeftButtons.append(showAboutButton.data);
    host.$contentArea.append(aboutContent.data);

    var $about = $("#about");

    function toggleAbout() {
      if($about.css('display') === 'inline-block') {
        $about.css('display', 'none');
        host.$mainUI.css('display', 'inline');
      } else {
        host.$mainUI.css('display', 'none');
        $about.css('display', 'inline-block');
      }
    }

    $("#showAboutButton").click(toggleAbout);
    $("#closeAboutButton").click(toggleAbout);
  };

  my.unload = function() {
    $("#about").remove();
    $("#showAboutButton").remove();
    //TODO: remove CSS link
    $("#aboutCSS").remove();
    //TODO: set enabled in manifest to false

  };

  return my;
}());
