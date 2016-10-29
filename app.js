/* Entry point of application */

var db = require('./db');

var express = require('express');
var app = new express();

// Route user
// TODO ADD auto on all files in route
app.use('/user', require('./src/routers/user.js'));
	
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
