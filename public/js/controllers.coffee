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
    modName = null
    mod = null
    if $scope.hasMod
      modName = $routeParams.modname
      $scope.mod = mod = _.findWhere $rootScope.mods,
        name: modName
      $scope.lobbies = publicLobbies
    $scope.createLobby = ->
      if $scope.hasMod
        $lobbyService.createLobby(null, mod._id)
      else
        $location.url('/newlobby')

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
]).controller("InstallModCtrl", [
  "$scope"
  "$lobbyService"
  "$routeParams"
  "$rootScope"
  "$location"
  ($scope, $lobbyService, $routeParams, $rootScope, $location)->
    modname = $routeParams.modname
    if !modname?
      return $location.url '/mods'
    mod = _.findWhere $rootScope.mods,
      name: modname
    if !mod?
      $location.url '/mods'
      return $.pnotify
        title: "Mod Not Found"
        text: "The mod you wanted to install can't be found."
        type: "error"
    $scope.status = $lobbyService.status
    $scope.startInstall = ->
      $lobbyService.installMod mod.name
]).controller("CreateLobbyCtrl", [
  "$scope"
  "$location"
  "$lobbyService"
  "$authService"
  ($scope, $location, $lobbyService, $authService)->
    $scope.isAuthed = $authService.isAuthed
    $scope.user = $authService.user
    $scope.selectMod = (mod)->
      name = $("#lobbyName").val()
      name = if name is "" then null else name
      $lobbyService.createLobby name, mod._id
]).controller("BottomBarCtrl", [
  "$scope"
  "$authService"
  "$lobbyService"
  ($scope, $authService, $lobbyService)->
    $scope.isAuthed = $authService.isAuthed
    $scope.user = $authService.user
    $scope.status = $lobbyService.status
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
