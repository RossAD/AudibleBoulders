/*jslint node: true */
"use strict";
var express = require('express');
var mysql = require('mysql');
var app = express();
// Setup Pool for MySql DB
var pool = mysql.createPool({
  connectionLimit : 200, //important
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'app',
  debug    :  false
});

module.exports = {

  getConnection : function(callback) {
    pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  }
};

