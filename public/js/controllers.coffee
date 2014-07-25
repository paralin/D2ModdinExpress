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
  "$authService"
  ($scope, $location, $routeParams, $rootScope, $lobbyService, $authService) ->
    publicLobbies = $lobbyService.publicLobbies
    $scope.hasMod = $routeParams.modname?
    $scope.auth = $authService
    $scope.lobbyFilter = {}
    $scope.sort = { order:$scope.totalPlayerCount, reverse:true }
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

    $scope.enterPassword = ->
      bootbox.prompt "Enter the lobby password:", (pass)->
        return if !pass?
        $lobbyService.usePassword pass

    $scope.getModThumbnail = (modid) ->
      mod = _.findWhere($rootScope.mods, _id: modid)
      if mod?
        mod.thumbsmall
      else
        ""
]).controller("ResultListCtrl", [
  "$scope"
  "$location"
  "$routeParams"
  "$rootScope"
  "$resultService"
  ($scope, $location, $routeParams, $rootScope, $resultService) ->
    $resultService.fetch(parseInt($routeParams.page))
    $scope.results = $resultServices.results
    $scope.getModThumbnailN = (modid) ->
      mod = _.findWhere($rootScope.mods, name: modid)
      if mod?
        mod.thumbsmall
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
        if pass.val() is ""
          $.pnotify
            title: "Password Unset"
            type: "info"
            text: "Your lobby is no longer password protected."
        else
          $.pnotify
            title: "Password Set"
            type: "info"
            text: "You have set a password on this lobby."
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
]).controller("NavCtrl", [
  "$scope"
  "$authService"
  ($scope, $authService)->
    $scope.auth = $authService
]).controller("LoadTestCtrl", [
  "$scope"
  "$lobbyService"
  "$rootScope"
  ($scope, $lobbyService, $rootScope)->
    $scope.status = $lobbyService.status
    $scope.startInstall = ->
      $lobbyService.installMod 'checker'
    $scope.showTroubleshoot = (trouble)->
      msg = "Can't find troubleshooting for #{trouble}, sorry."
      title = "Not found!"
      switch trouble
        when "manager"
          title = "Manager Issues"
          msg = """
          <p>First, check to make sure you're signed into the same Steam account on your computer as you are on the website. You need to restart the manager (right click dota icon in tray -> restart) any time you've changed something like this.</p>
          <p>Next, check to see if it actually connects - if it says 'Connected' then it has. If you're still having issues try running steam://flushconfig in your browser. If your client has connected but it does not say it has in the browser, the system is simply not linking the client with your account (it can't find the SteamIDs detected on your machine in any user accounts).</p>
          """
        when "download"
          title = "Download Issues"
          msg = """
          <p>So, the manager is connected, but download isn't working? First, double check that your manager is actually connected properly.</p>
          <p>You should see a notification at the bottom right with the install progress. Please wait at least 15 seconds for the download to start - it's possible that the server is just laggy right now.</p>
          <p>If your download fails midway, it's probably because the download had a hiccup midway through. Try again.</p>
          <p>If your extract fails, try closing Dota 2. Also check in the manager preferences (right click manager -> preferences in taskbar) that your Dota 2 directory is correct.</p>
          """
      bootbox.dialog
        title: title
        message: msg
        buttons:
          close:
            label: "Close"
            className: 'btn-success'
    $scope.$watch '$viewContentLoaded', ->
      window.wiz = wiz = $("#setup-wizard").wizard
        keyboard: false
        backdrop: false
        showCancel: false
        showClose: false
        progressBarCurrent: true
        contentHeight: 325
        buttons:
          cancelText: "Cancel"
          nextText: "Next"
          backText: "Back"
          submitText: "Start Test"
          submittingText: "Starting..."
      cb = $rootScope.$on('lobby:error', ->
        console.log "lobby error"
        wiz.submitFailure()
        wiz.changeNextButton("Try Again", "btn-success")
        wiz.reset()
      )
      $scope.$on '$destroy', ->
        cb()
        wiz.close()
      wiz.setSubtitle "Set up and test your D2Moddin client."
      wiz.on "submit", ->
        $lobbyService.startLoadTest()

      #Setup manager
      wiz.cards['setupmanager'].on 'validate', (card)->
        if !$lobbyService.status.managerConnected
          $.pnotify
            title: "Not Connected"
            text: "The manager isn't connected / hasn't linked with your account properly. Please click troubleshooting if you're having issues."
            type: "error"
            delay: 5000
          return false
        return true

      wiz.show()
]).controller('DoTestCtrl', [
  "$scope"
  "$authService"
  "$lobbyService"
  "$location"
  ($scope, $authService, $lobbyService, $location)->
    if !$authService.isAuthed || $lobbyService.lobbies.length is 0
      return $location.url('/setup')
    lobby = $scope.lobby = $lobbyService.lobbies[0]
    $scope.status = $lobbyService.status
    $scope.isHost = $scope.lobby.creatorid is $authService.user._id
    $scope.sendConnect = ->
      $lobbyService.sendConnect()
]).controller('MatchmakeCtrl', [
  "$scope"
  "$authService"
  "$lobbyService"
  "$location"
  ($scope, $authService, $lobbyService, $location)->
    if !$authService.isAuthed || $lobbyService.matchmake.length is 0
      return $location.url('/ranked')
    matchmake = $scope.matchmake = $lobbyService.matchmake[0]
    $scope.status = $lobbyService.status
    $scope.stopQueue = ->
      $lobbyService.exitMatchmake()
]).controller('ProfileCtrl', [
  "$scope"
  ($scope)->
]).controller('RankedCtrl', [
  "$scope"
  "$authService"
  "$lobbyService"
  ($scope, $authService, $lobbyService)->
    $scope.auth = $authService
    $scope.startQueue = (mod)->
      $lobbyService.startMatchmake [mod]
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
