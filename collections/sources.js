var SourceCollection = new Meteor.Collection("sources");

Sources = {
	getAll: function(currentUser) {
		return SourceCollection.find({user: currentUser});
	},

	add: function(sourceUrl, currentUser) {
		SourceCollection.insert({url: sourceUrl, user: currentUser});
	},

	clear: function(currentUser) {
		SourceCollection.remove({user: currentUser});
	}
}