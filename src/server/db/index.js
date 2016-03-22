/*jslint node: true */
"use strict";
var PORT = require('../server');
var express = require('express');
var mysql = require('mysql');
var app = express();
// Setup Pool for MySql DB

var password = (PORT === 8080) ? '' : 'raad39';
var pool = mysql.createPool({
  connectionLimit : 200, //important
  host     : 'localhost',
  user     : 'root',
  password : password,
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

