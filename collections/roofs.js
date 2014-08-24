var RoofCollection = new Meteor.Collection("roofs");

Roofs = {

	getInbox: function (currentUser) {
  	return RoofCollection.find(
  		{trash: false, star: false, user: currentUser},
  		{sort: {date: -1}, limit: 10});
	},

	getFavorites: function (currentUser) {
  	return RoofCollection.find(
  		{star: true, user: currentUser},
  		{sort: {date: -1}, limit: 10});
	},

	getTrash: function (currentUser) {
  	return RoofCollection.find(
  		{trash: true, user: currentUser},
  		{sort: {date: -1}, limit: 10});
	},

	clear: function (currentUser) {
		return RoofCollection.remove({user: currentUser});
	},

	add: function(roof, currentUser) {
		roof.trash = false;
		roof.star = false;
		roof.date = new Date();
		roof.user = currentUser;
		RoofCollection.insert(roof);
	},

	contains: function(roof, currentUser) {
		return RoofCollection.find({ roofId: roof.roofId, user: currentUser}).count() > 0;
	},

	update: function(roof) {
		RoofCollection.update({"_id": roof._id}, roof);
	}

}