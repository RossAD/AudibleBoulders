"use strict";

var pool = require('../db/index.js').getPool();

module.exports = {
  // NOTE: by "return", we really mean "pass to callback as results arg"

  getOne: function (githubId, dashboardId, callback) {
    // return matching users_dashboards record
  },
  associateUser: function (githubId, dashboardId, callback) {
    // if create, initialize with set_up=0. otherwise do nothing
    // no need to return anything (we don't think)
  },
  setUpTrue: function (signatureHash, callback) {
    // for that users_dashboards record, set set_up to 1
    // no return value
  },
  deleteOne: function (signatureHash, callback) {
    // delete record with matching signature_hash
    // no return value
  }
};
