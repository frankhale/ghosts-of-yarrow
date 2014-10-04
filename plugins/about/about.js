module.exports = (function() {
  'use strict';

  var my = {};

  my.init = function(host, templates) {
    var showAboutButtonTemplate = _.find(templates, {
        'name': 'showAboutButton.html'
      }),
      aboutContentTemplate = _.find(templates, {
        'name': 'about.html'
      });

    host.$topBarLeftButtons.append(showAboutButtonTemplate.data);
    host.$contentArea.append(aboutContentTemplate.data);

    var $about = $("#about");
    var $name = $("#name");
    var $description = $("#description");
    var $author = $("#author");
    var $date = $("#date");

    my.showAbout = function() {
      if ($about.css('display') === 'none') {
        host.$mainUI.css('display', 'none');
        $about.css('display', 'block');
      }
    };

    my.hideAbout = function() {
      if ($about.css('display') !== 'none') {
        $about.css('display', 'none');
        host.$mainUI.css('display', 'block');
      }
    };

    $("#showAboutButton").click(my.showAbout);
    $("#closeAboutButton").click(my.hideAbout);

    var corePackageJSON = host.getPackageJSON();

    $name.html("Name: " + corePackageJSON.name + "<br/>");
    $description.html("Description: " + corePackageJSON.description + "<br/>");
    $author.html("Author: " + corePackageJSON.author.name + "<br/>");
    $date.html("Date: " + moment(corePackageJSON["release-date"], "MM-DD-YYYY").format("MMMM Do YYYY")  + "<br/>");
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
