ArgenpropScraper = typeof ArgenpropScraper != 'undefined' ?  ArgenpropScraper : {};

ArgenpropScraper.getRoof = function(roofLite) {	
	var roof = ScraperUtils.loadPage(roofLite.url, scrapRoof);
	roof.roofId = roofLite.roofId;
	roof.url = roofLite.url;
	return roof;
}

var scrapRoof = function($) {
	return {
		siteName: "Argenprop",
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
	var fullAddress = $(".contDetalle .detalle .datos p .txt").last().text();
	var splitAddress = fullAddress.split("|");
	var last = splitAddress.length - 1;
	if (splitAddress[last].indexOf(" Piso ") > -1) {
		var address = splitAddress[last - 1].trim();
		var floor = splitAddress[last].trim();
		return address + " " + floor;
	}	else {
		return splitAddress[last].trim();
	}
}

var getPrice = function($) {
	return $(".contDetalle .detalle .datos p .txt.v").text().trim();
}

var getSurface = function($) {
	return safe($(".ListaInfo .ListaUno li .res").first().text().trim());
}

var getRoomsCount = function($) {
	return safe($(".ListaInfo .ListaUno li .Tag:contains('Cantidad de ambientes')")
		.first().next().text().trim());
}

var getPhotos = function($) {
	var photos = [];
	$("#ViewFotos .fotos img").each(function() {
		photos.push($(this).attr("src"));
	});
	return photos;
}

var getThumbnailUrl = function($) {
	return $("#fotoAmpliada").attr("src");
}

var getType = function($) {
	return safe($(".ListaInfo .ListaUno li .Tag:contains('Tipo de unidad')")
		.first().next().text().trim());
	// return $(".contDetalle .detalle .datos p .txt").eq(1).text().trim();
}

var getAge = function($) {
	return safe($(".ListaInfo .ListaUno li .Tag:contains('Antig')")
		.first().next().text().trim());
}

var getExpenses = function($) {
	return safe($(".ListaInfo .ListaUno li .Tag:contains('Expensas')")
		.first().next().text().trim());
}

var getDetails = function($) {
	return $("#TextoAdicional").html();
}

var safe = function (value) {
	return value.trim() == "" ? "-" : value;
}
