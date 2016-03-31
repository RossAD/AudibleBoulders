"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', 'RequestFactory', '$http', 'Socket', '$location', '$timeout',function($scope, RequestFactory, $http, Socket, $location, $timeout){
  $scope.subsc = [];
  $scope.loading = true;
  var linked = [];
  var first;
  var prev;
  var next;
  var last;
  // Hide page buttons on page load
  if($scope.loading){
    $scope.fst = true;
    $scope.lst = true;
    $scope.nxt = true;
    $scope.prv = true;
  } else {
    $scope.fst = false;
    $scope.lst = false;
    $scope.nxt = false;
    $scope.prv = false;
  }

  // Function to parse page information
  var linkParse = function(linkBody) {
    $scope.nxt = true;
    $scope.lst = true;
    $scope.fst = true;
    $scope.prv = true;
    var regLink = [];
    var splitLink = linkBody.split(' ');
    var pattern = /(<|>;|,|"|rel=)/ig;
    for(var i = 0; i < splitLink.length; i++) {
      regLink.push(splitLink[i].replace(pattern, ""));
    }
    regLink.forEach(function(item, index){
      if(index % 2 !== 0){
        if(item === 'next'){
          $scope.nxt = false;
          next = {link:regLink[index-1]};
        } else if(item === 'last') {
          $scope.lst = false;
          last={link:regLink[index-1]};
        } else if(item === 'first') {
          $scope.fst = false;
          first={link:regLink[index-1]};
        } else if(item === 'prev') {
          $scope.prv = false;
          prev={link:regLink[index-1]};
        }
      }
    });
  };
  // Function to get next page of results
  var pagePost = function(url){
    RequestFactory.getPage(url, function(res){
      linked = res.data.headers.link;
      linkParse(linked);
      $scope.subsc = [];
      $scope.subsc = JSON.parse(res.data.body);
    });
  };

  // Function to check which page button was pressed
  $scope.pages = function(page){
    if(page === 'first'){
      if(first !== undefined) {
        pagePost(first);
      } else {
        window.alert("You are on the First Page");
      }
    } else if(page === 'prev'){
      if(prev !== undefined) {
        pagePost(prev);
      } else {
        window.alert("You are on the First Page");
      }
    } else if(page === 'next'){
      if(next !== undefined) {
        pagePost(next);
      } else {
        window.alert("You are on the Last Page");
      }
    } else if(page === 'last'){
      if(last !== undefined) {
        pagePost(last);
      } else {
        window.alert("You are on the Last Page");
      }
    }
  };
  // Initial Call to get User Repos
  RequestFactory.getRepos(function(res){
    $scope.loading = false;
    linked = res.data.headers.link;
    if(linked !== undefined){
      linkParse(linked);
    } else {
      $scope.fst = true;
      $scope.lst = true;
      $scope.nxt = true;
      $scope.prv = true;
    }
    console.log('Any Links? ',linked);
    $scope.subsc = JSON.parse(res.data.body);
  });

  var emitJoinDash = function (repoObject) {
    var dashPath = repoObject.full_name;
    Socket.emit('newJoin', {
    });
    $location.path(dashPath);
  };

  $scope.postDashboard = function (repoObject) {
    var dashboardInfo = {org_name: repoObject.owner.login, repo_name: repoObject.name};
    RequestFactory.postDashboard(dashboardInfo)
    .then(function () {
      emitJoinDash(repoObject);
    });
  };
}]);
