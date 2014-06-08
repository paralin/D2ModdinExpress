'use strict';

// Declare app level module which depends on filters, and services

angular.module('d2mp', [
  'd2mp.controllers',
  'd2mp.filters',
  'd2mp.services',
  'd2mp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeCtrl'
    }).
    when('/about', {
      templateUrl: 'partials/about',
      controller: 'AboutCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
