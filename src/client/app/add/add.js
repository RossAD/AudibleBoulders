"use strict";
angular.module('add', [])
.controller('AddController', ['$scope', '$window', 'RequestFactory', '$http',function($scope, $window, RequestFactory, $http){
  console.log('AddController');
  // Variable to hold returned subscriptions
  var subsc;
  $http({
    method: 'GET',
    url: '/api/subscriptions'
  }).then(function (res){
    console.log('Subscriptions?? ', res.data);
    subsc = res.data;
  });
  function parseSub(array){
    var parseArr = [];
    for(var i = 0; i < array.length; i++){
        parseArr.push(array[i].full_name);
    }
    console.log(parseArr);
    return parseArr;
  }
  parseSub(subsc);


}]);
