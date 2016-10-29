/* Retrieve from database */

var mysql = require("mysql");

var env = require('fs');
var obj = JSON.parse(env.readFileSync('.env', 'utf8'));


var con = mysql.createConnection({
	host: "localhost",
	user: obj.user,
	database: obj.database,
	password: obj.password
});

con.connect(function(err) {
	if(err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log("Connection established");
});

con.query('SELECT * FROM user', function(err,rows) {
	if (err) throw err;
	
	console.log('DAta received from Db:\n');
	console.log(rows);
});

con.end(function(err) {

});

console.log("TEST");
