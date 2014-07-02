"use strict"

global = @

class QueueService
  constructor:($rootScope, @authService, @safeApply, @http)->
    @totalCount = 201150
    @inQueue = true
    @myPos = 0
    @invited = true
    $rootScope.$on "auth:data", (event,data)=>
      @safeApply $rootScope, =>
        if data.queue?
          @totalCount = data.queue.totalCount
          @inQueue = data.queue.inQueue
          @invited = data.queue.invited
          @myPos = (data.queue.queueID+1)-data.queue.totalInvited
          @totalInvited = data.queue.totalInvited
          @totalInvites = data.queue.totalInvites
          @originalPos = data.queue.queueID+1
  joinQueue: ->
    @http({method: 'POST', url: '/queue/joinQueue'})
      .success (data, status, headers, config)=>
        if(data.error)
          $.pnotify
            title: "Queue Error"
            text: data.error
            type: "error"
        @authService.update()
  tryUseKey: (key)->
    @http({method: 'POST', url: '/queue/tryUseKey', data: {key: key}})
      .success (data, status, headers, config)=>
        if(data.error)
          $.pnotify
            title: "Key Error"
            text: data.error
            type: "error"
        else
          $.pnotify
            title: "Key Claimed"
            text: "That key has been claimed!"
            type: "success"
        @authService.update()

class LobbyService
  constructor:($rootScope, $authService, @queue, @safeApply)->
    @lobbies = []
    @publicLobbies = []
    @socket = null
    @scope = $rootScope
    @auth = $authService
    @hasAuthed = false
    @hasAttemptedConnection = false
    @status =
      managerConnected: false
      managerStatus: "Authenticating with the lobby server..."
      managerDownloading: false
    @colls =
      lobbies: @lobbies
      publicLobbies: @publicLobbies
  
  disconnect: ->
    if @socket != null
      @socket.close()
      @socket = null
    @hasAuthed = false
    @lobbies.length = 0
    @publicLobbies.length = 0
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

  joinLobby: (id)->
    @call "joinlobby",
      LobbyID: id

  changeRegion: (region)->
    @call "setregion",
      region: region

  sendConnect: ->
    @call "connectgame", null

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

  sendAuth: ()->
    if !@auth.isAuthed || !@queue.invited
      console.log "Not authed or not invited, not sending auth."
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
    switch data.msg
      when "error"
        $.pnotify
          title: "Lobby Error"
          text: data.reason
          type: "error"
      when "chat"
        @scope.$broadcast 'lobby:chatMsg', data.message
      when "modneeded"
        @scope.$broadcast 'lobby:modNeeded', data.name
      when "testneeded"
        @scope.$broadcast 'lobby:testNeeded', data.name
      when "installres"
        @status.managerDownloading = false
        @scope.$broadcast 'lobby:installres', data.success, data.message
      when "colupd"
        @safeApply @scope, =>
          for upd in data.ops
            console.log JSON.stringify upd
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
    console.log "Would reconnect but it's disabled atm, refresh required"
    return
    if !@auth.isAuthed || !@queue.invited
      console.log "Not re-connecting as we aren't logged in/not invited."
      return
    setTimeout(=>
      @connect()
    ,3000)

  connect: ->
    @disconnect()
    console.log "Attempting connection..."
    @socket = so = new XSockets.WebSocket 'ws://net1.d2modd.in:4502/BrowserController'
    #@socket = so = new XSockets.WebSocket 'ws://172.250.79.95:4502/BrowserController'
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
        @scope.$digest()
        $.pnotify
          title: "Deauthed"
          text: "You are no longer authed with the lobby server."
          type: "error"
        @hasAuthed = false
    so.on 'lobby', (msg)=>
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
      @status.managerConnected = false
      @status.managerStatus = "You have lost connection with the lobby server..."
      @disconnect()
      @scope.$digest()
      if !@hasAttemptedConnection
        @hasAttemptedConnection = true
        $.pnotify
          title: "Disconnected"
          text: "Disconnected from the lobby server."
          type: "error"
      @reconnect()
    so.on "open", (clientinfo)=>
      console.log "OnOpen"
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
        return
      ).error (data, status, headers, config) ->
        $log.log "Error fetching auth status: " + data
        return

      return
    authService = {}
    authService.update = updateAuth
    updateAuth()
    $interval updateAuth, 15000
    return authService
]).factory("$lobbyService", [
  "$interval"
  "$log"
  "$authService"
  "$queueService"
  "$rootScope"
  "safeApply"
  ($interval, $log, $authService, $queueService, $rootScope, safeApply)->
    service = new LobbyService $rootScope, $authService, $queueService, safeApply
    $rootScope.$on "auth:data", (event,data)->
      if $authService.isAuthed
        service.sendAuth()
      else
        service.disconnect()
    global.service = service
    service
]).factory("$queueService", [
  "$authService"
  "$rootScope"
  "safeApply"
  "$http"
  ($authService, $rootScope, safeApply, $http)->
    service = new QueueService $rootScope, $authService, safeApply, $http
    global.queue = service
    service
]).factory('$forceLobbyPage', [
  '$rootScope'
  '$location'
  '$lobbyService'
  '$authService'
  '$queueService'
  '$timeout'
  "safeApply"
  ($rootScope, $location, $lobbyService, $authService, $queueService, $timeout, safeApply)->
    $rootScope.$on 'lobbyUpdate:lobbies', (event, op)->
      path = $location.path()
      if op in ['update', 'insert']
        console.log $lobbyService.lobbies
        if($lobbyService.lobbies.length > 0 && $lobbyService.lobbies[0].LobbyType == 1)
          if $location.url().indexOf('dotest') == -1
            $timeout =>
              $location.url('/dotest')
            return
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
      if !$queueService.invited && (newurl.indexOf('lobb') != -1 || newurl.indexOf('setup') != -1 || newurl.indexOf('installmod') != -1 || newurl.indexOf('dotest') != -1)
        event.preventDefault()
        return $timeout ->
          $location.url "/invitequeue"
      if $lobbyService.lobbies.length > 0
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
