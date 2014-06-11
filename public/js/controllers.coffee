"use strict"

# Controllers 

#var lobbies = lobbyCollection.getInstance();
angular.module("d2mp.controllers", []).controller("HomeCtrl", [
  "$scope"
  ($scope) ->
]).controller("AboutCtrl", [
  "$scope"
  ($scope) ->
]).controller("ModsCtrl", [
  "$scope"
  ($scope) ->
]).controller("LobbyListCtrl", [
  "$scope"
  "$location"
  "$routeParams"
  "$rootScope"
  "$lobbyService"
  ($scope, $location, $routeParams, $rootScope, $lobbyService) ->
    publicLobbies = $lobbyService.publicLobbies
    $scope.hasMod = $routeParams.modname?
    if $scope.hasMod
      $scope.mod = _.findWhere($rootScope.mods,
        name: $routeParams.modname
      )
    $scope.lobbies = publicLobbies
    $scope.joinLobby = (lobby) ->
      console.log lobby
      return

    $scope.getModThumbnail = (modid) ->
      mod = _.findWhere($rootScope.mods, _id: modid)
      if mod?
        mod.thumbnail
      else
        ""
]).controller("AuthCtrl", [
  "$scope"
  "$authService"
  ($scope, $authService) ->
    $scope.auth = $authService
    $scope.startLogin = ->
      window.location.href = "/auth/steam"
      return

    $scope.signOut = ->
      window.location.href = "/logout"
      return

    $scope.joinQueue = ->
      window.location.href = "http://d2modd.in/"
      return
]).controller "ModDetailCtrl", ($scope, $rootScope, $routeParams, $location, $sce) ->
  modname = $routeParams.modname
  mod = _.findWhere($rootScope.mods,
    name: modname
  )
  unless mod?
    $location.url "/mods/"
    return
  $scope.btnClass = (if mod.playable then "" else "disabled")
  $scope.mod = mod
  return

