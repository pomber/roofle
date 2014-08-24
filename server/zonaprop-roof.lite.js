ZonapropScraper = typeof ZonapropScraper != 'undefined' ?  ZonapropScraper : {};

ZonapropScraper.getRoofLites = function(url) {
	return ScraperUtils.loadPage(url, scrapSearch);
}

var scrapSearch = function($) {
	var roofLites = [];

	$("#listado > .aviso").each(function () {
		var $box = $(this);
		roofLites.push({
			roofId: getId($box),
			address: getAddress($box),
			url: getUrl($box),
			thumbnailUrl: getThumbnail($box),
			price: getPrice($box)
		});
		console.log(getId($box));
		console.log(getThumbnail($box));
	});

	var nextPageUrl = getNextPageUrl($);
	if (nextPageUrl)
	{
		roofLites = roofLites.concat(ScraperUtils.loadPage(nextPageUrl, scrapSearch));
	}

	return roofLites;
}

var getId = function($box) {
	return $box.attr("id");
}

var getAddress = function($box) {
	var fullAddress = $box.find("h2 a").text();
	var splitAddress = fullAddress.split("-");
	return splitAddress[0].trim();
}

var getUrl = function($box) {
	return $box.find("h2 a").attr("href");
}

var getThumbnail = function ($box) {
	return $box.find(".image img").first().attr("data-original");
}

var getPrice = function ($box) {
	return $box.find("span.precio").text();
}

var getNextPageUrl = function ($) {
	var $link = $("#paginacion a[title=\"Siguiente\"]");	
	return $link.length ? $link.attr("href") : false;
}