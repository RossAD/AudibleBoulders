'use strict';
var expect = require('chai').expect;
var request = require('request');
var mysql = require('mysql');
var server = require("../../src/server/server.js");
var spawn = require('child_process').spawnSync;

describe('Testing API End Points', function (done) {


  beforeEach(function(done) {
   spawn('npm', ['run', 'initTestDB']);
   spawn('npm', ['run', 'addTestData']);
   done();
  });

    var requestWithSession = request.defaults({jar: true});


    xit('/api/dashboards/:githubId route should return status code 200', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/dashboards/123'
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var url = 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders';
      j.setCookie(cookie, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    xit('/api/dashboards/:githubId route should return data in request body', function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/dashboards/123'
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var url = 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders';
      j.setCookie(cookie, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

    it('/api/dashboards/ route should post new dashboard' , function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://localhost:8080/api/dashboards/',
        'json': {
          commits_url: 'https://api.github.com/repos/alberthuynh91/Audibleboulders/commits{/sha}',
          html_url: 'https://github.com/AudibleBoulders/AudibleBoulders',
          default_branch: 'master',
          owner: {
            login: 'AudibleBoulders',
          },
          name: 'AudibleBoulders',
          last_commit: 'some random commit'
        }
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var url = 'http://localhost:8080/api/dashboards/';
      j.setCookie(cookie, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('/api/dashboards/:orgName/:repoName route should return status code 200' , function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders/',
        'headers': {
          'User-Agent': 'GitSpy',
          'authorization': 'token e5886e015c68c1181f0edd5f6ed514b39bb4d59a',
          'content-type': 'application/json'
        }
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var url = 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders';
      j.setCookie(cookie, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('/api/dashboards/:orgName/:repoName route should return data in request body' , function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders',
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var url = 'http://localhost:8080/api/dashboards/AudibleBoulders/AudibleBoulders';
      j.setCookie(cookie, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

    xit('/api/users_dashboards/:githubId/:dashboardId route should delete a dashboard' , function (done) {
      var options = {
        'method': 'DELETE',
        'uri': 'http://localhost:8080/api/users_dashboards/5342581/2',
      };

      requestWithSession(options, function(error, res, body) {
        expect(JSON.parse(body).affectedRows).to.equal(1);
        expect(JSON.parse(body).insertId).to.equal(0);
        done();
      });
    });

    xit('/api/setup/:orgName/:repoName/:githubId route should get signature hash for setup page' , function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/setup/AudibleBoulders/AudibleBoulders/5342581',
      };

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

    xit('/api/commits/ route should create a new commit for given user' , function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://localhost:8080/api/commits/',
        'json': {
          dashboards_id: '1',
          diffs: '',
          last_pulled_commit: 'thelastpulledcommit',
          users_id: '1'
        }
      };

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

    xit('/api/repos/ route should get user repos from github' , function (done) {
      var options = {
        'method': 'POST',
        'uri': 'http://localhost:8080/api/repos/',
        'json': {
          link: 'http://www.gitspy.com'
        }
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var cookie2 = request.cookie('gitHubName="Albert"');
      var url = 'http://localhost:8080/api/repos/';
      j.setCookie(cookie, url);
      j.setCookie(cookie2, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

    xit('/api/repos/ route should get user repos from github' , function (done) {
      var options = {
        'method': 'GET',
        'uri': 'http://localhost:8080/api/repos/',
        'json': {
          link: 'http://www.github.com/'
        }
      };

      var j = request.jar();
      var cookie = request.cookie('githubId=5342581');
      var cookie2 = request.cookie('gitHubName="Albert"');
      var url = 'http://localhost:8080/api/repos/';
      j.setCookie(cookie, url);
      j.setCookie(cookie2, url);
      var requestWithSession = request.defaults({jar: j});

      requestWithSession(options, function(error, res, body) {
        expect(body).to.not.be.empty;
        done();
      });
    });

});