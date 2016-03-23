"use strict";

var pool = require('../db/index.js');

module.exports = {
  findOrCreate: function (githubId, dashboardId) {
    // if create, initialize with set_up=0. otherwise do nothing
    // no need to return anything (we don't think)
  },
  getSignatureHash: function (githubId, dashboardId) {
    // return signature_hash for the matching users_dashboards record
  },
  setUpTrue: function (signatureHash) {
    // for that users_dashboards record, set set_up to 1
    // no return value
  },
  deleteOne: function (signatureHash) {
    // delete record with matching signature_hash
    // no return value
  }
};
