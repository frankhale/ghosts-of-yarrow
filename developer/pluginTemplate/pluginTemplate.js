module.exports = (function(){
  'use strict';

  var my = {};

  my.init = function(host, templates) {
    //var pluginTemplateContent = _.find(templates, { 'name': 'pluginTemplate.html' });
  };

  my.unload = function() {
    $("#pluginTemplateCSS").remove();
  };

  return my;
}());
