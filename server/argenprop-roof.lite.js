ArgenpropScraper = typeof ArgenpropScraper != 'undefined' ?  ArgenpropScraper : {};

ArgenpropScraper.getRoofLites = function(url) {
	return ScraperUtils.loadPage(url, scrapSearch);
}

var scrapSearch = function($) {
	var roofLites = [];

	// $("li.avisoitem").each(function () {
	// 	var $box = $(this);
	// 	roofLites.push({
	// 		roofId: getId($box),
	// 		address: getAddress($box),
	// 		url: getUrl($box),
	// 		thumbnail: getThumbnail($box),
	// 		price: getPrice($box)
	// 	});
	// });

	// var nextPageUrl = getNextPageUrl($);
	// if (nextPageUrl)
	// {
	// 	roofLites = roofLites.concat(ScraperUtils.loadPage(nextPageUrl, scrapSearch));
	// }

	return roofLites;
}

var getId = function($box) {
	return $box.attr("id");
}

var getAddress = function($box) {
	var fullAddress = $box.find("h2.address a").text();
	var splitAddress = fullAddress.split(",");
	var last = splitAddress.length - 1;
	if (splitAddress[last].indexOf(" piso ") > -1) {
		var address = splitAddress[last - 1].trim();
		var floor = splitAddress[last].trim();
		return address + " " + floor;
	}	else {
		return splitAddress[last].trim();
	}
}

var getUrl = function($box) {
	return "http://www.argenprop.com" + $box.find("h2.address a").attr("href");
}

var getThumbnail = function ($box) {
	return $box.find(".aviso-image img").attr("src");
}

var getPrice = function ($box) {
	return $box.find(".aviso-details .precio").text();
}

var getNextPageUrl = function ($) {
	var $link = $("a[title=\"Siguiente\"]");	
	return $link.length ? $link.attr("href") : false;
}