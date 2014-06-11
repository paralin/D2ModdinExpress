"use strict"
app = angular.module("d2mp", [
  "ngRoute"
  "d2mp.controllers"
  "d2mp.filters"
  "d2mp.services"
  "d2mp.directives"
]).config([
  "$routeProvider"
  "$locationProvider"
  "$sceDelegateProvider"
  ($routeProvider, $locationProvider, $sceDelegateProvider) ->
    $sceDelegateProvider.resourceUrlWhitelist ["**"]
    $routeProvider.when "/",
      templateUrl: "partials/home"
      controller: "HomeCtrl"

    $routeProvider.when "/about",
      templateUrl: "partials/about"
      controller: "AboutCtrl"

    $routeProvider.when "/lobbies/:modname?",
      templateUrl: "partials/lobbylist"
      controller: "LobbyListCtrl"

    $routeProvider.when "/mods",
      templateUrl: "partials/mods"
      controller: "ModsCtrl"

    $routeProvider.when "/mods/:modname",
      templateUrl: "partials/moddetail"
      controller: "ModDetailCtrl"

    $routeProvider.when '/install/:modname',
      templateUrl: 'partials/installmod'
      controller: 'InstallModCtrl'

    $routeProvider.when '/newlobby',
      templateUrl: '/partials/newlobby'
      controller: 'CreateLobbyCtrl'

    $routeProvider.otherwise redirectTo: "/"
    $locationProvider.html5Mode true
]).run(($rootScope, $lobbyService, $forceLobbyPage) ->
  $rootScope.mods = []
  $rootScope.REGIONS = #CN: 4
    UNKNOWN: 0
    NA: 1
    EU: 2
    AUS: 3

  $rootScope.launchManager = ->
    window.open "https://s3-us-west-2.amazonaws.com/d2mpclient/D2MPUpdater.exe"
    $.pnotify
      title: "Download Started"
      text: "Run the launcher (downloading now) to start joining lobbies."
      type: "info"
      delay: 3000
      closer: false
      sticker: true

  $rootScope.REGIONSK = _.invert($rootScope.REGIONS)
  $rootScope.REGIONSH =
    0: "All Regions"
    1: "North America"
    2: "Europe"
    3: "Australia"

  $.getJSON "/data/mods", (data) ->
    $rootScope.$apply ->
      window.rootScope = $rootScope
      window.mods = $rootScope.mods = data
)
