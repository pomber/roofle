var currentUser = window.location.pathname;

Template.content.roofs = function () {
	if (Session.get("current-folder") == "favs") {
		return Roofs.getFavorites(currentUser);
	} else if (Session.get("current-folder") == "trash") {
		return Roofs.getTrash(currentUser);
	} else {
  	return Roofs.getInbox(currentUser);
	}
};

Template.roof.events({
	'click .roof-thumbnail': function (event, template) {
		$(template.findAll(".not-expanded")).hide();
		$(template.findAll(".expanded")).show();
	},

	'click .roof-trash': function (event, template) {		
		$('html, body').animate({
        scrollTop: $(template.find(".roof")).offset().top
    });

		var roof = template.data;
		roof.trash = !roof.trash;

		Roofs.update(roof);
	},

	'click .roof-star': function (event, template) {		
		$('html, body').animate({
        scrollTop: $(template.find(".roof")).offset().top
    });

		var roof = template.data;
		roof.star = !roof.star;
		Roofs.update(roof);
	}

});

var showDetails = function (roof) {
		Session.set("photo-urls", roof.photos);
		Deps.flush();
		$("#photos-modal").modal();	
}
