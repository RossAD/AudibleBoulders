"use strict";

var request = require('request');
var promise = require('bluebird');

// NOTE: when using the methods in this module, append "Async" to the end of the method name
var github = module.exports = promise.promisifyAll({
  query: function (url, token, callback) {
    var options = {
      url: url,
      headers: {
        'User-Agent': 'GitSpy',
        authorization: 'token ' + token,
        'content-type': 'application/json'
      }
    };
    request.get(options, function (err, response, body) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, JSON.parse(body));
      }
    });
  }
});