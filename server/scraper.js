Scraper = {};

var getScraper = function (url) {
	//TODO pasar validacion al scraper especifico
	//TODO hacer una lista de scrapers 
	if (url.indexOf("argenprop.com") != -1) {
		return ArgenpropScraper;
	} else if (url.indexOf("zonaprop.com") != -1) {
		return ZonapropScraper;
	} else {
		return false;
	}
}

scrapSource = function (url, currentUser) {
	var scraper = getScraper(url);	
	
	if (!scraper) {		
		console.log("Sorry, no se que hacer con: " + url);
		return;
	}

	var roofLites = scraper.getRoofLites(url);
	var newRoofs = [];
	for (var i = roofLites.length - 1; i >= 0; i--) {
		var roofLite = roofLites[i];
		if (!Roofs.contains(roofLite, currentUser) 
			&& roofLite.url != null) {
			var roof = scraper.getRoof(roofLite);
			Roofs.add(roof, currentUser);
			newRoofs.push(roof);
		}
	}

	return newRoofs;
}

Scraper.scrap = function (currentUser) {
	var sources = Sources.getAll(currentUser);
	var newRoofs = [];

	sources.forEach(function (source) {
		var sourceNewRoofs = scrapSource(source.url, currentUser);
		newRoofs = newRoofs.concat(sourceNewRoofs);
	});

	return newRoofs;
}
