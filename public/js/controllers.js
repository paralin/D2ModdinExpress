'use strict';

/* Controllers */

angular.module('d2mp.controllers', []).
  controller('HomeCtrl', ['$scope', function ($scope) {

  }]).
  controller('AboutCtrl', ['$scope', function ($scope) {

  }]).
  controller('ModsCtrl', ['$scope', function ($scope) {

  }]).
  controller('LobbyListCtrl', ['$scope', '$location', '$routeParams', '$rootScope', function ($scope, $location, $routeParams, $rootScope) {
    //var lobbies = lobbyCollection.getInstance();
    //var publicLobbies = publicLobbyCollection.getInstance();
    $scope.hasMod = $routeParams.modname != null;
    if($scope.hasMod){
      $scope.mod = _.findWhere($rootScope.mods, {name: $routeParams.modname});
    }
    //$scope.lobbies = publicLobbies;
    $scope.joinLobby = function(lobby){
      console.log(lobby);
    }
  }]).
  controller('AuthCtrl', ["$scope", "$authService", function($scope, $authService){
    $scope.auth = $authService;
    $scope.startLogin = function(){
      window.location.href = "/auth/steam";
    };
    $scope.signOut = function(){
      window.location.href = "/logout";
    };
    $scope.joinQueue = function(){
      window.location.href = "http://d2modd.in/";
    };
    $scope.getModThumbnail = function(lobby){
      var mod = _.findWhere($rootScope.mods, {_id: lobby.mod});
      if(mod != null) return mod.thumbnail;
      else return "";
    };
  }]).
  controller('ModDetailCtrl', function($scope, $rootScope, $routeParams, $location, $sce){
    var modname = $routeParams.modname;
    var mod = _.findWhere($rootScope.mods, {name: modname});
    if(mod == null){
      $location.url("/mods/");
      return;
    }
    $scope.btnClass = mod.playable ? "" : "disabled";
    $scope.mod = mod;
  });
