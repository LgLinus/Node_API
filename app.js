/* Entry point of application */

var db = require('./db');

var express = require('express');
var app = new express();

var fs = require('fs');

// Routes folder
var routes = './src/routers/';

// Initailies routes
fs.readdir(routes, function(err, files) {
	files.forEach(function(file) {
		app.use('/' + file.split(".")[0], require(routes + "/" + file));
		console.log(file);
	});
});

	
db.connect(db.DEVELOPMENT_DB, function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.');
	}
	else {
		app.listen(8181, function() {
			console.log('Listening on port 8181....');
		});
	}
});
