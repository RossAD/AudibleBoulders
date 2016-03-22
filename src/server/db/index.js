/*jslint node: true */
"use strict";
var express = require('express');
var mysql = require('mysql');
var app = express();
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
// function handle_database(req,res) {

//   pool.getConnection(function(err,connection){
//     if (err) {
//       connection.release();
//       res.json({"code" : 100, "status" : "Error in connection database"});
//       return;
//     }

//     connection.query("select * from users",function(err,rows){
//       connection.release();
//       if(!err) {
//         res.json(rows);
//       }
//     });

//     connection.on('error', function(err) {
//       res.json({"code" : 100, "status" : "Error in connection database"});
//       return;
//     });
//   });
// }
// // var port = 3000;
// app.get("/",function(req,res){-
//   handle_database(req,res);
// });

// app.listen(port);
// console.log('Test Server Started on Port ', port);
// module.exports = getConnection();
