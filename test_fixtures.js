var data = {
  tables: {
    user: [
     {FNAME: "John",LNAME: "Petersson", AGE: 32, ADDRESS : "Sweden"},
     {FNAME: "Peter",LNAME: "Johnssons", AGE: 29, ADDRESS : "MURICA"},
    ]
  }
};

var db = require('./db');

db.connect(db.MODE_PRODUCTION, function() {
  db.fixtures(data, function(err) {
    if (err) return console.log(err);
    console.log('Data has been loaded...');
  });
});
