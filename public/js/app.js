'use strict';

var app = angular.module('d2mp', [
  'ngRoute',
  'd2mp.controllers',
  'd2mp.filters',
  'd2mp.services',
  'd2mp.directives'
]).config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
  $routeProvider.when('/', {templateUrl: 'partials/home', controller: 'HomeCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about',controller: 'AboutCtrl'});
  $routeProvider.when('/lobbies/:modname?', {templateUrl: 'partials/lobbylist',controller: 'LobbyListCtrl'});
  $routeProvider.when('/mods', {templateUrl: 'partials/mods',controller: 'ModsCtrl'});
  $routeProvider.when('/mods/:modname', {templateUrl: 'partials/moddetail', controller: 'ModDetailCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}]).run(function($rootScope, $lobbyService) {
  $rootScope.mods = [];
  $rootScope.REGIONS = {UNKNOWN: 0,NA:1,EU:2,AUS:3} //CN: 4
  $rootScope.REGIONSK = _.invert($rootScope.REGIONS)
  $rootScope.REGIONSH = {0:"All Regions",1:"North America",2:"Europe",3:"Australia"}
  $.getJSON("/data/mods", function(data){
    $rootScope.$apply(function(){
      window.rootScope = $rootScope;
      window.mods = $rootScope.mods = data;
    });
  });
});
