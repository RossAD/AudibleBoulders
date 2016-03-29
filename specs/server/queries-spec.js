/** Require libraries **/
var Promise = require('bluebird');
var expect = require('../../node_modules/chai/chai').expect;
var spawnSync = require('child_process').spawnSync;

/** Create and require connection for 'test' DB and test data **/
var PORT = process.env.PORT || 8080;
var createPool = require('../../src/server/db/index.js').createPool('test', 8080);
var pool = require('../../src/server/db/index.js').getPool();
var query = Promise.promisify(pool.query, {context: pool});
var testData = require('./queries-test-data.js');

/** Require all DB query files **/
var diffs = require('../../src/server/queries/diffs.js');
var dashboards = require('../../src/server/queries/dashboards.js');
var users = require('../../src/server/queries/users.js');
var users_dashboards = require('../../src/server/queries/users_dashboards.js');

describe('Database Unit Tests', function() {
  describe('Users Queries', function() {

    beforeEach(function() {
      spawnSync('npm', ['run', 'initTestDB']);
      var insertStr = 'INSERT into users (github_id, github_handle, github_name, github_avatar, github_token) VALUES (1, "yaliceme", "Alice Yu", "alice.jpg", "123");';
      return query(insertStr);
    });

    it('Should return a user object', function() {
      return users.getOneAsync(1)
        .then(function(userObject) {
          expect(typeof userObject).to.equal('object');
        })
    });

    it('Should retrieve the correct user', function() {
      return users.getOneAsync(1)
        .then(function(userObject) {
          expect(userObject.github_name).to.equal("Alice Yu");
        });
    });

    it('Should add a user to the database', function() {
      return users.addOneAsync(testData.user)
        .then(function(results) {
          return users.getOneAsync(testData.user.github_id);
        })
        .then(function(userObject) {
          expect(userObject.github_name).to.equal("James Bond");
        });
    });

    it('Should update an user', function() {
      return users.updateOneAsync(testData.updateUser)
        .then(function(results) {
          expect(results).to.equal("User updated");
        })
    });

    it('Should update a user when user already exists', function() {
      return users.updateOrCreateAsync(testData.updateUser)
        .then(function(results) {
          expect(results).to.equal("User updated");
        });
    });

    it('Should create a user when user does not exists', function() {
      return users.updateOrCreateAsync(testData.createUser)
        .then(function(results) {
          expect(results).to.equal("User added");
        });
    });

    it('Should get all users associated with a dashboard', function() {
      //TODO
    });


  });

  describe('Dashboards queries', function() {
    it('Should get the correct dashboard', function() {
      //TODO
    });

    it('Should get all dashboards associated with a user', function() {
      //TODO
    });

    it('Should update last commit', function() {
      //TODO
    });

    it('Should find a dashbord if it exists', function() {
      //TODO
    });

    it('Should create a dashboard if it does not exist', function() {
      //TODO
    });
  });

  describe('Users_Dashboards queries', function() {
    it('Should get the correct user_dashboard', function() {
      //TODO
    });

    it('Should create the correct user_dashboard', function() {
      //TODO
    });

    it('Should delete the correct user_dashboard', function() {
      //TODO
    });

    it('Should update the correct user_dashboard', function() {
      //TODO
    });
  });

  describe('Diffs queries', function() {
    it('Should delete all diffs associated with a user_dashboard', function() {
      //TODO
    });

    it('Should add an array of diffs', function() {
      //TODO
    });

    it('Should get all diffs associated with a user_dashboard', function() {
      //TODO
    });
  });

});