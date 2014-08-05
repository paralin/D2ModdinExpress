"use strict"

global = @

class NotService
  constructor: (@http)->
    @notifications = []
    @pnots = []
  clear: ->
    for noti in @pnots
      if noti? and noti.remove?
        noti.remove()
    @pnots.length = 0
  render: ->
    for noti in @notifications
      opts =
        hide: false
        buttons:
          closer: true
          sticker: false
        nonblock:
          nonblock: false
        stack: {"dir1": "right", "dir2": "up", "push": "top"}
        addclass: "stack-bottomleft"
      _.extend opts, noti
      @pnots.push $.pnotify opts
  fetch: ->
    @http.get('/data/nots')
      .success (data, status)=>
        @notifications = data
        @clear()
        @render()
class LobbyService
  constructor:($rootScope, $authService, @safeApply)->
    @lobbies = []
    @publicLobbies = []
    @matchmake = []
    @friends = []
    @socket = null
    @isDuplicate = false
    @scope = $rootScope
    @auth = $authService
    @hasAuthed = false
    @hasAttemptedConnection = false
    @status =
      managerConnected: false
      managerStatus: "Connecting to the lobby server..."
      managerDownloading: false
    @FRIENDSTATUS = {
        NotRegistered:0,
        Offline:1,
        Online:2,
        Idle:3,
        InLobby:4,
        Spectating:5,
        InGame:6
    }
    @friendstatus = "Loading..."
    @colls =
      lobbies: @lobbies
      publicLobbies: @publicLobbies
      matchmake: @matchmake
      friends: @friends
  disconnect: ->
    if @socket != null
      @socket.close()
      @socket = null
    @hasAuthed = false
    @lobbies.length = 0
    @publicLobbies.length = 0
    @friends.length = 0
    console.log "Disconnected."

  send: (data)->
    return if !@socket?
    @socket.publish 'data', data

  startLoadTest: ->
    @call "startLoadTest", {}
  call: (method, params)->
    data =
      id: method
      req: params
    @send data

  leaveLobby: ->
    @call "leavelobby"

  installMod: (modname)->
    @call "installmod",
      mod: modname
    @status.managerDownloading = true

  switchTeam: (goodguys)->
    @call "switchteam",
      team: if goodguys then "radiant" else "dire"

  startQueue: ->
    @call "startqueue", null

  joinLobby: _.debounce((id)->
    @call "joinlobby",
      LobbyID: id
  , 1000, true)

  changeRegion: (region)->
    @call "setregion",
      region: region

  sendConnect: ->
    @call "connectgame", null

  exitMatchmake: ->
    @call "stopmatchmake", null

  startMatchmake: (mods)->
    @call "matchmake",
      mods: mods

  stopFinding: ->
    @call "stopqueue", null

  usePassword: (pass)->
    @call "joinpasswordlobby",
      password: pass

  changePassword: (pass)->
    @call "setpassword",
      password: pass

  changeTitle: (title)->
    @call "setname",
      name: title

  sendChat: (msg)->
    @call "chatmsg",
      message: msg

  kickPlayer: (player)->
    @call 'kickplayer',
      steam: player.steam

  createLobby: (name, modid)->
    @call "createlobby",
      name: name
      mod: modid

  inviteFriend: (steamid)->
    @call 'invitefriend',
      steamid: steamid

  joinFriendLobby: (steamid)->
    @call 'joinfriendlobby',
      steamid: steamid

  sendAuth: ()->
    if !@auth.isAuthed
      console.log "Not authed, not sending auth."
      @disconnect()
    else
      if !@hasAuthed
        if !@socket?
          @connect()
        else
          @send
            id: 'auth'
            uid: @auth.user._id
            key: @auth.token

  handleMsg: (data)->
    console.log _.clone data
    switch data.msg
      when "error"
        $.pnotify
          title: "Lobby Error"
          text: data.reason
          type: "error"
        @scope.$broadcast 'lobby:error', data.reason
      when "chat"
        @scope.$broadcast 'lobby:chatMsg', data.message
      when "modneeded"
        @scope.$broadcast 'lobby:modNeeded', data.name
      when "invite"
        console.log "Invite received, #{data.source}, #{data.mod}"
        @scope.$broadcast 'friend:invite',
          steam: data.source
          modname: data.mod
        window.invitesound.play()
      when "testneeded"
        @scope.$broadcast 'lobby:testNeeded', data.name
      when "updatemods"
        @scope.$broadcast 'mods:updated'
      when "installres"
        @status.managerDownloading = false
        @scope.$broadcast 'lobby:installres', data.success, data.message
      when "colupd"
        @safeApply @scope, =>
          for upd in data.ops
            continue if !upd?
            coll = @colls[upd._c]
            _c = upd._c
            eve = "lobbyUpdate:"+_c
            op = upd._o
            delete upd["_o"]
            delete upd["_c"]
            switch op
              when "insert"
                coll.push upd
              when "update"
                id = upd._id
                delete upd["_id"]
                obj = _.findWhere coll, {_id: id}
                if obj?
                  _.extend obj, upd
              when "remove"
                id = upd._id
                if !id?
                  coll.length = 0
                else
                  obj = _.findWhere coll, {_id: id}
                  if obj?
                    idx = coll.indexOf obj
                    if idx isnt -1
                      coll.splice idx, 1
            if _c is "lobbies"
              for lobby in @lobbies
                lobby.dire = _.without lobby.dire, null
                lobby.radiant = _.without lobby.radiant, null
            @scope.$broadcast eve, op

  reconnect: ->
    if !@auth.isAuthed || @isDuplicate
      console.log "Not re-connecting as we aren't logged in/are a duplicate."
      return
    setTimeout(=>
      @connect()
    ,3000)

  connect: ->
    @disconnect()
    if !@auth.isAuthed || @isDuplicate
      console.log "Not connecting as we aren't logged in/are a duplicate."
      return
    console.log "Attempting connection..."
    #@socket = so = new XSockets.WebSocket 'ws://net1.d2modd.in:4502/BrowserController'
    @socket = so = new XSockets.WebSocket 'ws://172.250.79.95:4502/BrowserController'
    so.on 'duplicate', (data)=>
      @safeApply @scope, =>
        @lobbies.length = 0
        @publicLobbies.length = 0
        @isDuplicate = true
        $.pnotify
          title: "Duplicate"
          text: "You have opened a new D2Moddin browser window/tab, and disconnected this session. Refresh to re-connect this browser tab."
          type: "error"
          hide: false
        @status.managerStatus = "Already open in another tab. Refresh to re-try connection."
    so.on 'auth', (data)=>
      if data.status
        $.pnotify
          title: "Authenticated"
          text: "You are now authenticated with the lobby server."
          type: "success"
        @hasAuthed = true
      else
        @lobbies.length = 0
        @publicLobbies.length = 0
        @friends.length = 0
        @scope.$digest()
        $.pnotify
          title: "Deauthed"
          text: "You are no longer authed with the lobby server."
          type: "error"
        @hasAuthed = false

    so.on 'updatemods', (msg)=>
      @handleMsg msg

    so.on 'publicLobbies', (msg)=>
      @handleMsg msg

    so.on 'invite', (msg)=>
      @handleMsg msg

    so.on 'lobby', (msg)=>
      @handleMsg msg
      
    so.on 'friend', (msg)=>
      @handleMsg msg
      
    so.on 'manager', (msg)=>
      if msg.msg is 'status'
        if msg.status
          @status.managerConnected = true
          @status.managerStatus = "Manager running and ready."
        else
          @status.managerConnected = false
          @status.managerStatus = "Manager is not connected."
        @scope.$digest()
    so.on "close", =>
      @disconnect()
      @safeApply @scope, =>
        @lobbies.length = 0
        @publicLobbies.length = 0
        @status.managerConnected = false
        if !@isDuplicate
          @status.managerStatus = "You have lost connection with the lobby server..."
      if !@hasAttemptedConnection
        @hasAttemptedConnection = true
        $.pnotify
          title: "Disconnected"
          text: "Disconnected from the lobby server."
          type: "error"
      @reconnect()
    so.on "open", (clientinfo)=>
      @hasAttemptedConnection = false
      $.pnotify
        title: "Connected"
        text: "Connected to the lobby server"
        type: "success"
      @lobbies.length = 0
      @publicLobbies.length = 0
      @scope.$digest()
      @sendAuth()
    
angular.module("d2mp.services", []).factory("safeApply", [
  "$rootScope"
  ($rootScope) ->
    ($scope, fn) ->
      phase = $rootScope.$$phase
      if phase is "$apply" or phase is "$digest"
        $scope.$eval fn  if fn
      else
        if fn
          $scope.$apply fn
        else
          $scope.$apply()
      return
  ]).factory("$authService", [
  "$interval"
  "$http"
  "$log"
  "$rootScope"
  "safeApply"
  ($interval, $http, $log, $rootScope, safeApply) ->
    updateAuth = ->
      $http(
        method: "GET"
        url: "/data/authStatus"
      ).success((data, status, headers, config) ->
        if data.isAuthed != authService.isAuthed
          $log.log "Authed: "+data.isAuthed
        authService.isAuthed = data.isAuthed
        authService.user = data.user
        $rootScope.$broadcast "auth:isAuthed", data.isAuthed
        $rootScope.$broadcast "auth:data", data
        authService.user = data.user
        authService.token = data.token
        if data.version isnt window.d2version
          $.pnotify
            title: "Out of Date"
            text: "Your browser will refresh in a few seconds to download the new web app."
            type: "info"
            close: false
          window.setTimeout =>
            window.location.reload(true)
          , 5000
        return
      ).error (data, status, headers, config) ->
        $log.log "Error fetching auth status: " + data
        return

      return
    authService = {}
    authService.update = updateAuth
    updateAuth()
    $interval updateAuth, 60000
    return authService
]).factory("$notService", [
  "$http"
  ($http)->
    new NotService $http
]).factory("$lobbyService", [
  "$interval"
  "$log"
  "$authService"
  "$rootScope"
  "safeApply"
  ($interval, $log, $authService, $rootScope, safeApply)->
    service = new LobbyService $rootScope, $authService, safeApply
    $(window).unload service.disconnect
    $rootScope.$on "auth:data", (event,data)->
      if $authService.isAuthed
        service.sendAuth()
      else
        service.disconnect()
    global.service = service
    service
]).factory('$handleInvites', [
  "$rootScope"
  "$lobbyService"
  ($rootScope, $lobbyService)->
    $rootScope.$on "friend:invite", (event, data)->
      friend = _.findWhere $lobbyService.friends, {_id: data.steam}
      if !friend?
        $.pnotify
          title: "Invite Failed"
          text: "An unknown friend (#{data.steam}) has sent you an invite to a lobby."
          type: "error"
          delay: 5000
      else
        bootbox.dialog
          message: "#{friend.name} has invited you to join their #{data.modname} lobby."
          title: "Invite"
          buttons:
            decline:
              label: "Ignore"
              className: "btn-danger"
              callback: ->
                $.pnotify
                  title: "Invite Declined"
                  text: "Invite from #{friend.name} has been declined."
                  type: "info"
            accept:
              label: "Accept & Join"
              className: "btn-success"
              callback: ->
                service.joinFriendLobby data.steam
]).factory("leaderboard", [
  '$resource'
  ($resource)->
    $resource '/data/leaders/:name', {name: "reflex"},
      get:
        method: "GET"
        isArray: true
]).factory("matchResults", [
  '$resource'
  ($resource)->
    $resource '/data/matches/:page', {page: 1},
      get:
        method: "GET"
        isArray: false
]).factory('$forceLobbyPage', [
  '$rootScope'
  '$location'
  '$lobbyService'
  '$authService'
  '$timeout'
  "safeApply"
  ($rootScope, $location, $lobbyService, $authService, $timeout, safeApply)->
    $rootScope.$on 'lobbyUpdate:matchmake', (event, op)->
      path = $location.path()
      if op in ['update', 'insert']
        if($lobbyService.matchmake.length > 0)
          if $location.url().indexOf('matchmake') == -1
            $timeout =>
              $location.url('/matchmake')
            return
      else
        if path.indexOf('matchmake') isnt -1
          safeApply $rootScope, ->
            $location.path('/ranked')
    $rootScope.$on 'lobbyUpdate:lobbies', (event, op)->
      path = $location.path()
      if op in ['update', 'insert']
        if($lobbyService.lobbies.length > 0 && $lobbyService.lobbies[0].LobbyType == 1)
          if $location.url().indexOf('dotest') == -1
            $timeout =>
              $location.url('/dotest')
            return
        lobby = $lobbyService.lobbies[0]
        if lobby.radiant.length+lobby.dire.length==10 && lobby.creatorid is $authService.user._id && lobby.status == 0
          $rootScope.playReadySound()
        if path.indexOf('lobby/') is -1 && $lobbyService.lobbies.length > 0
          safeApply $rootScope, ->
            $location.url "/lobby/"+$lobbyService.lobbies[0]._id
      else
        if path.indexOf('lobby/') isnt -1 || path.indexOf('dotest') isnt -1
          safeApply $rootScope, ->
            $location.path('/lobbies')
    $rootScope.$on 'lobby:installres', (event, success, message)->
      $.pnotify
        title: "Install Result"
        text: message
        type: if success then "success" else "error"
        delay: 5000
      if success && $location.url().indexOf('setup') is -1
        $location.url '/lobbies/'
    $rootScope.$on 'lobby:modNeeded', (event, mod)->
      if $location.url().indexOf('setup') != -1
        $pnotify
          title: "Install Needed"
          text: "You still need to install the #{mod} mod before you can start."
          type: "error"
          delay: 4000
        return
      safeApply $rootScope, ->
        $location.url '/install/'+mod
    $rootScope.$on 'lobby:testNeeded', (event, mod)->
      safeApply $rootScope, ->
        $location.url '/setup'
    $rootScope.$on '$locationChangeStart', (event, newurl, oldurl)->
      window.FundRazr = undefined
      $("#fr_hovercard-outer").remove()
      if $lobbyService.matchmake.length > 0
        if newurl.indexOf('matchmake') != -1
          return
        event.preventDefault()
        if oldurl.indexOf('matchmake') == -1
          safeApply $rootScope, ->
            $location.url '/matchmake'
      else if $lobbyService.lobbies.length > 0
        if $lobbyService.lobbies[0].LobbyType == 1
          if newurl.indexOf('dotest') != -1
            return
          event.preventDefault()
          if oldurl.indexOf('dotest') == -1
            $location.url '/dotest'
        else if $lobbyService.lobbies[0].LobbyType == 0
          if newurl.indexOf('/lobby/') != -1
            return
          event.preventDefault()
          if oldurl.indexOf('lobby/') is -1
            safeApply $rootScope, ->
              $location.url "/lobby/"+$lobbyService.lobbies[0]._id
      else
        if newurl.indexOf('/lobby/') != -1
          $location.url('/lobbies')
])
