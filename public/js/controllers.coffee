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
    $scope.lobbyFilter = {}
    modName = null
    mod = null
    if $scope.hasMod
      modName = $routeParams.modname
      $scope.mod = mod = _.findWhere $rootScope.mods,
        name: modName
      $scope.lobbyFilter.mod = mod._id

    $scope.lobbies = publicLobbies
    $scope.createLobby = ->
      if $scope.hasMod
        $lobbyService.createLobby(null, mod._id)
      else
        $location.url('/newlobby')

    $scope.joinLobby = (lobby) ->
      $lobbyService.joinLobby lobby._id

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
    $scope.auth = $authService
    $scope.status = $lobbyService.status
]).controller('LobbyCtrl', [
  "$scope"
  "$authService"
  "$lobbyService"
  "$location"
  "$rootScope"
  ($scope, $authService, $lobbyService, $location, $rootScope)->
    list = []
    if !$authService.isAuthed || $lobbyService.lobbies.length is 0
      return $location.url('/lobbies')
    lobby = $scope.lobby = $lobbyService.lobbies[0]
    $scope.status = $lobbyService.status
    mod = $scope.mod = _.findWhere $rootScope.mods,
      _id: lobby.mod
    $scope.isHost = $scope.lobby.creatorid is $authService.user._id
    if $scope.isHost
      $scope.changeTitle = ->
        title = $(".titleInput")
        $lobbyService.changeTitle title.val()
        title.blur()
      $scope.changePassword = ->
        pass = $(".passwordInput")
        $lobbyService.changePassword pass.val()
        pass.blur()
      $scope.changeRegion = (newVal)->
        $lobbyService.changeRegion newVal
      $scope.stopFinding = ->
        $lobbyService.stopFinding()
    $scope.sendConnect = ->
      $lobbyService.sendConnect()
    $scope.leaveLobby = ->
      $lobbyService.leaveLobby()
    $scope.kickPlayer = (player)->
      $lobbyService.kickPlayer(player)
    $scope.takeSlot = (goodguys)->
      $lobbyService.switchTeam goodguys
    $scope.startQueue = ->
      $lobbyService.startQueue()
    $scope.sendMessage = ->
      msg = $("#chatInput").val()
      $("#chatInput").val("")
      return if msg is ""
      $lobbyService.sendChat msg
    getEmptySlots = (team)->
      playerCount = 0
      for player in team
        continue if !player?
        playerCount+=1
      slotCount = 5-playerCount
      slots = []
      while slotCount--
        slots.push null
      slots
    generateEmptySlots = ->
      $scope.direSlots = getEmptySlots lobby.dire
      $scope.radiantSlots = getEmptySlots lobby.radiant
    generateEmptySlots()
    list.push $rootScope.$on 'lobbyUpdate:lobbies', (event, op)->
      return if op != "update"
      generateEmptySlots()
    list.push $rootScope.$on 'lobby:chatMsg', (event, msg)->
      box = $(".chatBox")
      return if box.length is 0
      box.val(box.val()+"\n"+msg)
      box.scrollTop(box[0].scrollHeight)
    $scope.$on "$destroy", ->
      for l in list
        l()
])
.controller "ModDetailCtrl", ($scope, $rootScope, $routeParams, $location, $sce) ->
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
