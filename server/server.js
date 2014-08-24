Meteor.startup(function () {
  
  Future = Npm.require('fibers/future');
  // Roofs.clear();
  // Sources.clear();

  Meteor.methods({
    scan: function (currentUser) {
      var newRoofs = Scraper.scrap(currentUser);
      Mailer.sendMail(newRoofs);
    }
  });

});