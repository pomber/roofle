ScraperUtils = {
	loadPage: function (url, callback) {
		var future = new Future();

		console.log("Scrapping url: " + url);
		var wrappedCallback = Meteor.bindEnvironment(function (err, $) {
			if (err) {
				console.log("Error scrapping: " + err);
				return;
			}

			future['return'](callback($));
		});

		Meteor.require('scrap')(url, wrappedCallback);

		return future.wait();
	} 
}