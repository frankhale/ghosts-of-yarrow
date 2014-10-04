module.exports = (function(){
  'use strict';

  var my = {};

  function getSelectOption(val) {
    return $('#pluginList option[value="' + val + '"]');
  }

  my.init = function(host, templates) {

    my.host = host;

    var showPluginManagerButton = _.find(templates, { 'name': 'showPluginManagerButton.html' }),
        pluginManagerContent = _.find(templates, { 'name': 'pluginManager.html' });

    host.$topBarLeftButtons.append(showPluginManagerButton.data);
    host.$contentArea.append(pluginManagerContent.data);

    var $pluginManager = $("#pluginManager");
    var $pluginList = $("#pluginList");

    function togglePluginManager() {
      if($pluginManager.css('display') === 'inline-block') {
        $pluginManager.css('display', 'none');
        host.$mainUI.css('display', 'inline');
      } else {
        host.$mainUI.css('display', 'none');
        $pluginManager.css('display', 'inline-block');
        $pluginList.val([]);
      }
    }

    my.togglePluginManager = function() {
      togglePluginManager();
    };

    function toggleEnableDisableButtonState() {
      var p = _.find(host.plugins, { "name": $pluginList.val() });
      if(p !== undefined) {
        if(('enabled' in p) && p.enabled) {
          $("#enableButton").attr('disabled','disabled');
          $("#disableButton").removeAttr('disabled');
        } else if(('enabled' in p) && !p.enabled) {
          $("#enableButton").removeAttr('disabled');
          $("#disableButton").attr('disabled','disabled');
        } else if('core' in p) {
          $("#enableButton").attr('disabled','disabled');
          $("#disableButton").attr('disabled','disabled');
        }
      }
    }

    function addPluginsToList() {
      //console.log(host.plugins);
      _.forEach(host.plugins, function(p) {
        //console.log("adding plugin : " + p.name + " to plugin list...");
        var _class;

        if (('core' in p) && p.core) {
          _class = "pluginCore";
        } else {
          if(p.enabled) {
            _class = "pluginEnabled";
          } else if (!p.enabled) {
            _class = "pluginDisabled";
          }
        }

        $pluginList.append("<option class='"+_class+"' value='"+ p.name +"'>"+ p.name +"</option>");
      });

      $pluginList.val([]);

      toggleEnableDisableButtonState();
      $pluginList.prop("size", host.plugins.length);
      $pluginList.on("change", function(e) {
        toggleEnableDisableButtonState();
      });
    }

    $("#showPluginManagerButton").click(togglePluginManager);
    $("#closePluginManagerButton").click(togglePluginManager);
    $("#disableButton").click(function() {
      var p = _.find(host.plugins, { "name": $pluginList.val() });
      if(p !== undefined && !('core' in p) && ('enabled' in p) && p.enabled) {
          p.pluginInstance.unload();
          p.enabled = false;
          getSelectOption($pluginList.val()).removeClass("pluginEnabled").addClass("pluginDisabled");
          toggleEnableDisableButtonState();
      }
    });
    $("#enableButton").click(function() {
      var p = _.find(host.plugins, { "name": $pluginList.val() });
      if(p !== undefined && !('core' in p) && ('enabled' in p) && !p.enabled) {
        host.loadPlugin($pluginList.val());
        getSelectOption($pluginList.val()).removeClass("pluginDisabled").addClass("pluginEnabled");
        toggleEnableDisableButtonState();
      }
    });

    host.registerCallbackForPluginsFinishedLoaded(addPluginsToList);
  };

  // my.unload = function() {
  //   my.togglePluginManager();
  //   $("#showPluginManagerButton").remove();
  //   $("#pluginManagerCSS").remove();
  //   $("#pluginManager").remove();
  // };

  return my;
}());
