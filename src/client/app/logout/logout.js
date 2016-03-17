"use strict";
angular.module('logout', [])
.controller('LogoutController', function(AuthFactory){
  AuthFactory.eatCookies();
  AuthFactory.logout();
});
