module.exports = (function(){
  'use strict';

  var my = {};

  my.init = function(host, templates) {
    var showSettingsButton = _.find(templates, { 'name': 'showSettingsButton.html' }),
        settingsContent = _.find(templates, { 'name': 'settings.html' });

    host.$topBarLeftButtons.append(showSettingsButton.data);
    host.$contentArea.append(settingsContent.data);

    var $settings = $("#settings");

    function toggleSettings() {
      if($settings.css('display') === 'inline-block') {
        $settings.css('display', 'none');
        host.$mainUI.css('display', 'inline');
      } else {
        host.$mainUI.css('display', 'none');
        $settings.css('display', 'inline-block');
      }
    }

    $("#showSettingsButton").click(toggleSettings);
    $("#closeSettingsButton").click(toggleSettings);
  };

  my.unload = function() {
    $("#settings").remove();
    $("#showSettingsButton").remove();
    $("#settingsCSS").remove();
    //TODO: set enabled in manifest to false
  };

  return my;
}());
