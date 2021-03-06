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
]).controller('ResultCtrl', [
  "$scope"
  "matchResult"
  "$routeParams"
  "$rootScope"
  "$location"
  ($scope, matchResult, $routeParams, $rootScope, $location)->
    $scope.match = matchResult.get {match_id: $routeParams.match_id}, (data)->
      $scope.mod = _.findWhere $rootScope.mods, {name: data.mod}
      window.match = data
      if data.error?
        $.pnotify {title: "Not Found", text: "That match result was not found.", type: "error"}
        $location.path("/results/")
]).controller("MatchHistoryCtrl", [
  "$scope"
  "$rootScope"
  "$lobbyService"
  "$authService"
  "matchResults"
  "$routeParams"
  "$location"
  ($scope, $rootScope, $lobbyService, $authService, matchResults, $routeParams, $location) ->
    $scope.auth = $authService
    $scope.filter = $routeParams
    $scope.sort = { order: "date", reverse:true }
    window.scope = $scope
    $scope.getTotalItems = ->
      Math.ceil matchData.count/matchData.perPage
    $scope.goToResult = (result)->
      $location.path("/result/#{result.match_id}")
    $scope.fetchPage = ->
      if $scope.mod?
        $scope.filter.mod = $scope.mod.name
      else
        $scope.filter.mod = undefined
      data = matchResults.get $scope.filter, (data)->
        $scope.matchData = data
      window.matchData = data
    $scope.matchData = {count: 60000, data: [], perPage: 20}
    $scope.fetchPage()
    $scope.getModThumbnail = (modid) ->
      mod = _.findWhere($rootScope.mods, name: modid)
      if mod?
        mod.thumbsmall
      else
        ""
    $scope.getModByName = (modid) ->
      mod = _.findWhere($rootScope.mods, name: modid)
    $scope.moment = moment
    $scope.duration = (input,units)->
      duration = moment().startOf('day').add(units, input)
      format = ""
      if duration.hour() > 0
        format += "H [hours] [\n]"
      if duration.minute() > 0
        format += "m [min] [\n]"
      format += " s [sec]"
      return duration.format(format)
]).controller("LeaderboardCtrl", [
  "$scope"
  "$rootScope"
  "$lobbyService"
  "$authService"
  "leaderboard"
  ($scope, $rootScope, $lobbyService, $authService, leaderboard) ->
    $scope.auth = $authService
    $scope.players = leaderboard.get()
    $scope.sort = { order: "profile.mmr.reflex", reverse:true }
    updateMods = ->
      $scope.mod = _.findWhere $rootScope.mods, {name: "reflex"}
    clear = $rootScope.$on "mods:downloaded", updateMods
    updateMods()
    $scope.$on "$destroy", ->
      clear()
]).controller("LobbyListCtrl", [
  "$scope"
  "$location"
  "$routeParams"
  "$rootScope"
  "$lobbyService"
  "$authService"
  ($scope, $location, $routeParams, $rootScope, $lobbyService, $authService) ->
    $scope.lobbies = $lobbyService.publicLobbies
    $scope.auth = $authService
    $scope.lobbyFilter = {}
    $scope.fullFilter = true
    $scope.sort = { order:$scope.totalPlayerCount, reverse:true }

    if $routeParams.modname?
      $scope.mod = mod = _.findWhere $rootScope.mods,
        name: $routeParams.modname
      $scope.lobbyFilter.mod = mod._id
      $location.path('/lobbies', false)

    $scope.createLobby = ->
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

    $scope.updateFilter = (prop,value) ->
      if value is null
        delete $scope.lobbyFilter[prop]
      else
        $scope.lobbyFilter[prop] = value

    $scope.showFullLobbies = (value) ->
      if value is true
        delete $scope.lobbyFilter['count']
      else
        $scope.lobbyFilter.count = "!10"
        
])
.controller("AuthCtrl", [
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
]).controller("FriendCtrl", [
  "$scope"
  "$lobbyService"
  "$rootScope"
  "$authService"
  ($scope, $lobbyService, $rootScope, $authService) ->
    $scope.getStatusText = (s) ->
        switch (s)
            when $lobbyService.FRIENDSTATUS.NotRegistered then "Not registered"
            when $lobbyService.FRIENDSTATUS.Offline then "Offline"
            when $lobbyService.FRIENDSTATUS.Online then "Online"
            when $lobbyService.FRIENDSTATUS.Idle then "Idle"
            when $lobbyService.FRIENDSTATUS.InLobby then "In Lobby"
            when $lobbyService.FRIENDSTATUS.Spectating then "Spectating"
            when $lobbyService.FRIENDSTATUS.InGame then "In Game"
    $scope.statusenum = $lobbyService.FRIENDSTATUS
    $scope.auth = $authService
    $scope.friends = $lobbyService.friends

    $scope.inviteFriend = (steamid) ->
      $lobbyService.inviteFriend steamid

    $scope.joinFriendLobby = (steamid) ->
      $lobbyService.joinFriendLobby steamid

    $rootScope.friendsOnline = (friend) ->
      friend.status >= 2
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
  "$rootScope"
  "$authService"
  ($scope, $location, $lobbyService, $rootScope, $authService)->
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
    matchmake = $scope.matchmake = $lobbyService.matchmake
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
