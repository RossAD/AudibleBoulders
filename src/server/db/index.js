/*jslint node: true */
"use strict";
var mysql = require('mysql');
var pool = null;

module.exports = {
  createPool: function(database, PORT) {
    var password = (PORT === 8080) ? '' : 'raad39';
    pool  = mysql.createPool({
      connectionLimit : 200,
      host     : 'localhost',
      user     : 'root',
      password : password,
      database : database,
      debug    :  false
    });
  },
  getConnection : function(callback) {
    pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  }
};
