ZonapropScraper = typeof ZonapropScraper != 'undefined' ?  ZonapropScraper : {};

ZonapropScraper.getRoof = function(roofLite) {	
	var roof = ScraperUtils.loadPage(roofLite.url, scrapRoof);
	roof.roofId = roofLite.roofId;
	roof.url = roofLite.url;
	return roof;
}

var scrapRoof = function($) {
	return {
		siteName: "zonaprop",
		address: getAddress($),
		price: getPrice($),
		surface: getSurface($),
		roomsCount: getRoomsCount($),
		thumbnailUrl: getThumbnailUrl($),
		photos: getPhotos($),
		type: getType($),
		age: getAge($),
		expenses: getExpenses($),
		details: getDetails($)
	};
}

var getAddress = function($) {	
	return $(".header .h2").first().text().trim();
}

var getPrice = function($) {
	return $(".header .h2").eq(1).text().trim();
}

var getSurface = function($) {	
	return $("dt:contains('Superficie total (m2):')")
		.first().next().text().trim() + " m2";
}

var getRoomsCount = function($) {	
	return safe($("dt:contains('Ambientes:')")
		.first().next().text().trim());
}

var getType = function($) {
	return $("dt:contains('Tipo de departamento:')")
		.first().next().text().trim();
}

var getAge = function($) {
	return "-";
}

var getExpenses = function($) {
	return safe($("dt:contains('Expensas')")
		.first().next().text().trim());
}

var getDetails = function($) {
	return $("#description").html();
}

var safe = function (value) {
	return value.trim() == "" ? "-" : value;
}

var getPhotos = function($) {
	var photos = [];
	$("#image_wrap img").each(function() {
		photos.push($(this).attr("data-original"));
	});
	return photos;
}

var getThumbnailUrl = function($) {
	return $("#image_wrap img").first().attr("data-original");
}
