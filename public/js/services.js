'use strict';

angular.module('d2mp.services', []).
  factory('$authService', ["$interval", "$http", "$log", function($interval, $http, $log){
  var authService = {};
  function updateAuth(){
    $http({method: 'GET', url: '/data/authStatus'}).
      success(function(data, status, headers, config){
        $log.log("Auth status received.");
        $log.log(data);
        authService.isAuthed = data.isAuthed;
        authService.user = data.user;
    }).
      error(function(data, status, headers, config){
        $log.log('Error fetching auth status: '+data);
    });
  }
  authService.update = updateAuth;
  updateAuth();
  $interval(updateAuth, 60000);
  return authService;
}]);
