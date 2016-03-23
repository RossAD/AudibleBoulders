"use strict";

var pool = require('../db/index.js');

module.exports = {
  deleteAll: function (signatureHash) {
    // delete all records from diffs that have a matching users_dashboards_signature_hash
    // no return value
  },
  addAll: function (signatureHash, diffsArray) {
    // go through diffsArray and add a new record in diffs table for each, with users_dashboards_signature_hash set to signatureHash
    // no return value
  },
  getAll: function (signatureHash) {
    // return an array of diff objects that have a matching users_dashboards_signature_hash
  }
};
