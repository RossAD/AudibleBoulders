var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'app'
});

connection.connect();

module.exports = connection;
