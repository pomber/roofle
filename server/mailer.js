Mailer = {};

Mailer.sendMail = function(newRoofs) {
	if (newRoofs.length > 0) {
  	Email.send({
  		from: "roshi@roshi.com",
  		to: "pombopombopombo@gmail.com",
  		subject: getSubject(newRoofs),
  		html: getBody(newRoofs)
  	});
  }	
}

function getSubject(newRoofs) {
	if (newRoofs.length == 1) {
		return "Nuevo departamento subido";
	}
	return newRoofs.length + " nuevos departamentos subidos";
}

function getBody(newRoofs) {
	var body = "";
	for (var i = 0; i < newRoofs.length; i++) {
		var roof = newRoofs[i];
		var line = getLine(roof);
		body = body + line;
	};
	return body;
}

function getLine(roof) {
	var text = "<h3>" + roof.address + "</h3>" 
		+  roof.url + "<br>"
		+ "precio: " + roof.price + "<br>" 
		+ "superficie: " + roof.surface + "<br>" 
		+ "expensas: " + roof.expenses + "<br>" 
		+ "antiguedad: " + roof.age + "<br>";

	for (var i = 0; i < roof.photos.length; i++) {
		text = text + "<img src='" +roof.photos[i] +"'/>";
	}

	return text + "<br>"
		+  roof.url + "<br> <br>";
}