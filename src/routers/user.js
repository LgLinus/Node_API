var express = require('express');

var router = express.Router();

var model = require('../models/user.js');

router.use(function timeLog(req, response, next) {
	console.log("TIME: ", Date.now());
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	
	next();
});

/*Accessed with http://localhost:8181/user/x where x is an id */
router.get('/:id', function(request, response) {
	var id = request.params.id;
	model.getUserById(response, id, print_data);
});

router.get('/', function(req, response) {
	model.getAll(response,print_data);
});

/* Callback function, prints data in json format */
var print_data = function(response,code,data) {
	response.writeHead(200, {"Content-Type" : "application/json"});
	console.log(data);
	response.write(JSON.stringify(data));	
	response.end();
};

module.exports = router;
