/* Model for the user table */

var db = require('../../db');

/* Create a user */
exports.create = function(fname,lname,age,address,res) {
	var values = [fname,lname,age,address];

	db.get().query('INSERT INTO user (FNAME,LNAME,AGE,ADDRESS) VALUES(?,?,?,?)', values, function(res,err, result) {

		if (err) return callback(res,0,err);
	
		/* Memo to self, callback is a function passed as argument above */
		callback(res, 1, result.ID);

	});
};

/* Retrieve all users */
exports.getAll = function(res,callback) {
	console.log(res);
	db.get().query('SELECT * FROM user', function(err, rows) {
		if(err) return callback(res, 1, err);
		callback(res, 0, rows);
	});
};

/* Retrieve one user, using id */
exports.getUserById = function(res, id, callback) {
	db.get().query('SELECT * FROM user WHERE id = ?', id, function (err, rows) {
		if(err) return callback(res, 1, callback);
		callback(res, 0, rows);
	});
};
