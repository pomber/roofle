Session.set("current-folder","inbox");
var currentUser = window.location.pathname;

if (window.location.hash == "#scan") {
  Meteor.call("scan", currentUser);
}

Meteor.setInterval(function () {
  console.log("scan");
  Meteor.call("scan", currentUser);
}, 7000 * 60);

Template.nav.events({
	'click #btn-show-add-source': function () {
		$("#scan-sources-container").hide();
		$("#add-source-container").show();
	},

  'click #btn-add-source': function () {
  	var newSourceUrl = $("#new-source").val();
  	$("#new-source").val("");
		$("#add-source-container").hide();
		$("#scan-sources-container").show();
  	Sources.add(newSourceUrl, currentUser);
  },

  'click #btn-scan': function () {
  	Meteor.call("scan", currentUser);
  },

  'click #inbox-link': function () {
  	$("#current-folder").text("Inbox");
  	Session.set("current-folder","inbox");
		// Template.content.roofs = function () {
		//   return Roofs.getInbox();
		// };
  },

  'click #fav-link': function () {
  	$("#current-folder").text("Favs");
  	Session.set("current-folder","favs");
		// Template.content.roofs = function () {
		//   return Roofs.getFavorites();
		// };
  },

  'click #trash-link': function () {
  	$("#current-folder").text("Trash");
  	Session.set("current-folder","trash");
		// Template.content.roofs = function () {
		//   return Roofs.getTrash();
		// };
  }
});