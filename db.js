/* Retrieve from database */

var mysql = require("mysql");
var async = require('async');

var state = {
	pool: null,
	mode: null,
};


var env = require('fs');
var obj = JSON.parse(env.readFileSync('.env', 'utf8'));

exports.connect = function(mode, done) {
	state.pool = mysql.createPool({
		host: 'localhost',
		user: obj.user,
		password: obj.password,
		database: obj.database
	});
	state.mode = mode;
	done();
};

exports.get = function() {
	return state.pool;
};

/* Insert a row in a table using JSON. 
   Example data:
	var data = {
	  tables: {
	    user: [
	     {FNAME: "John",LNAME: "Petersson", AGE: 32, ADDRESS : "Sweden"},
	     {FNAME: "Peter",LNAME: "Johnssons", AGE: 29, ADDRESS : "MURICA"},
	    ]
	  }
	};

	}*/
exports.fixtures = function(data) {
	var pool = state.pool;
	if (!pool) return done(new Error('Missing database connection.'));

	var names = Object.keys(data.tables);
	
	async.each(names, function(name, cb) {
		async.each(data.tables[name], function(row, cb) {
			var keys = Object.keys(row);
			var values = keys.map(function(key) {
				return "'" + row[key] + "'";
			});
			/*
				Create query, join on each column, sepearted by ","
				ex. insert into users(id,fname,lname) VALUES(1,'linus','granath');
			*/
	var statement = 'INSERT INTO ' + name + ' (' + keys.join(",") + ') VALUES (' + values.join(',') + ')';
	pool.query(statement, cb);
	console.log(statement);
		}, cb);
	}, pool.done);
};

exports.drop = function(tables, done) {
	var pool = state.pool;
	if (!pool) return done(new Error('Missing database connection.'));
	
	async.each(tables, function(name, cb) {
		pool.query('DELETE * FROM ' + name, cb);
	}, done);
};

console.log("TEST");
