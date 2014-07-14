// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  angular.module("d2mp.controllers", []).controller("HomeCtrl", ["$scope", function($scope) {}]).controller("AboutCtrl", ["$scope", function($scope) {}]).controller("ModsCtrl", ["$scope", function($scope) {}]).controller("LobbyListCtrl", [
    "$scope", "$location", "$routeParams", "$rootScope", "$lobbyService", "$authService", function($scope, $location, $routeParams, $rootScope, $lobbyService, $authService) {
      var mod, modName, publicLobbies;
      publicLobbies = $lobbyService.publicLobbies;
      $scope.hasMod = $routeParams.modname != null;
      $scope.auth = $authService;
      $scope.lobbyFilter = {};
      modName = null;
      mod = null;
      if ($scope.hasMod) {
        modName = $routeParams.modname;
        $scope.mod = mod = _.findWhere($rootScope.mods, {
          name: modName
        });
        $scope.lobbyFilter.mod = mod._id;
      }
      $scope.lobbies = publicLobbies;
      $scope.createLobby = function() {
        if ($scope.hasMod) {
          return $lobbyService.createLobby(null, mod._id);
        } else {
          return $location.url('/newlobby');
        }
      };
      $scope.joinLobby = function(lobby) {
        return $lobbyService.joinLobby(lobby._id);
      };
      $scope.enterPassword = function() {
        return bootbox.prompt("Enter the lobby password:", function(pass) {
          if (pass == null) {
            return;
          }
          return $lobbyService.usePassword(pass);
        });
      };
      return $scope.getModThumbnail = function(modid) {
        mod = _.findWhere($rootScope.mods, {
          _id: modid
        });
        if (mod != null) {
          return mod.thumbsmall;
        } else {
          return "";
        }
      };
    }
  ]).controller("ResultListCtrl", [
    "$scope", "$location", "$routeParams", "$rootScope", "$resultService", function($scope, $location, $routeParams, $rootScope, $resultService) {
      $resultService.fetch(parseInt($routeParams.page));
      $scope.results = $resultServices.results;
      return $scope.getModThumbnailN = function(modid) {
        var mod;
        mod = _.findWhere($rootScope.mods, {
          name: modid
        });
        if (mod != null) {
          return mod.thumbsmall;
        } else {
          return "";
        }
      };
    }
  ]).controller("AuthCtrl", [
    "$scope", "$authService", function($scope, $authService) {
      $scope.auth = $authService;
      $scope.startLogin = function() {
        window.location.href = "/auth/steam";
      };
      return $scope.signOut = function() {
        window.location.href = "/logout";
      };
    }
  ]).controller("InstallModCtrl", [
    "$scope", "$lobbyService", "$routeParams", "$rootScope", "$location", function($scope, $lobbyService, $routeParams, $rootScope, $location) {
      var mod, modname;
      modname = $routeParams.modname;
      if (modname == null) {
        return $location.url('/mods');
      }
      mod = _.findWhere($rootScope.mods, {
        name: modname
      });
      if (mod == null) {
        $location.url('/mods');
        return $.pnotify({
          title: "Mod Not Found",
          text: "The mod you wanted to install can't be found.",
          type: "error"
        });
      }
      $scope.status = $lobbyService.status;
      return $scope.startInstall = function() {
        return $lobbyService.installMod(mod.name);
      };
    }
  ]).controller("CreateLobbyCtrl", [
    "$scope", "$location", "$lobbyService", "$authService", function($scope, $location, $lobbyService, $authService) {
      $scope.isAuthed = $authService.isAuthed;
      $scope.user = $authService.user;
      return $scope.selectMod = function(mod) {
        var name;
        name = $("#lobbyName").val();
        name = name === "" ? null : name;
        return $lobbyService.createLobby(name, mod._id);
      };
    }
  ]).controller("BottomBarCtrl", [
    "$scope", "$authService", "$lobbyService", function($scope, $authService, $lobbyService) {
      $scope.auth = $authService;
      return $scope.status = $lobbyService.status;
    }
  ]).controller('LobbyCtrl', [
    "$scope", "$authService", "$lobbyService", "$location", "$rootScope", function($scope, $authService, $lobbyService, $location, $rootScope) {
      var generateEmptySlots, getEmptySlots, list, lobby, mod;
      list = [];
      if (!$authService.isAuthed || $lobbyService.lobbies.length === 0) {
        return $location.url('/lobbies');
      }
      lobby = $scope.lobby = $lobbyService.lobbies[0];
      $scope.status = $lobbyService.status;
      mod = $scope.mod = _.findWhere($rootScope.mods, {
        _id: lobby.mod
      });
      $scope.isHost = $scope.lobby.creatorid === $authService.user._id;
      if ($scope.isHost) {
        $scope.changeTitle = function() {
          var title;
          title = $(".titleInput");
          $lobbyService.changeTitle(title.val());
          return title.blur();
        };
        $scope.changePassword = function() {
          var pass;
          pass = $(".passwordInput");
          $lobbyService.changePassword(pass.val());
          pass.blur();
          if (pass.val() === "") {
            return $.pnotify({
              title: "Password Unset",
              type: "info",
              text: "Your lobby is no longer password protected."
            });
          } else {
            return $.pnotify({
              title: "Password Set",
              type: "info",
              text: "You have set a password on this lobby."
            });
          }
        };
        $scope.changeRegion = function(newVal) {
          return $lobbyService.changeRegion(newVal);
        };
        $scope.stopFinding = function() {
          return $lobbyService.stopFinding();
        };
      }
      $scope.sendConnect = function() {
        return $lobbyService.sendConnect();
      };
      $scope.leaveLobby = function() {
        return $lobbyService.leaveLobby();
      };
      $scope.kickPlayer = function(player) {
        return $lobbyService.kickPlayer(player);
      };
      $scope.takeSlot = function(goodguys) {
        return $lobbyService.switchTeam(goodguys);
      };
      $scope.startQueue = function() {
        return $lobbyService.startQueue();
      };
      $scope.sendMessage = function() {
        var msg;
        msg = $("#chatInput").val();
        $("#chatInput").val("");
        if (msg === "") {
          return;
        }
        return $lobbyService.sendChat(msg);
      };
      getEmptySlots = function(team) {
        var player, playerCount, slotCount, slots, _i, _len;
        playerCount = 0;
        for (_i = 0, _len = team.length; _i < _len; _i++) {
          player = team[_i];
          if (player == null) {
            continue;
          }
          playerCount += 1;
        }
        slotCount = 5 - playerCount;
        slots = [];
        while (slotCount--) {
          slots.push(null);
        }
        return slots;
      };
      generateEmptySlots = function() {
        $scope.direSlots = getEmptySlots(lobby.dire);
        return $scope.radiantSlots = getEmptySlots(lobby.radiant);
      };
      generateEmptySlots();
      list.push($rootScope.$on('lobbyUpdate:lobbies', function(event, op) {
        if (op !== "update") {
          return;
        }
        return generateEmptySlots();
      }));
      list.push($rootScope.$on('lobby:chatMsg', function(event, msg) {
        var box;
        box = $(".chatBox");
        if (box.length === 0) {
          return;
        }
        box.val(box.val() + "\n" + msg);
        return box.scrollTop(box[0].scrollHeight);
      }));
      return $scope.$on("$destroy", function() {
        var l, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          l = list[_i];
          _results.push(l());
        }
        return _results;
      });
    }
  ]).controller("NavCtrl", [
    "$scope", "$authService", function($scope, $authService) {
      return $scope.auth = $authService;
    }
  ]).controller("LoadTestCtrl", [
    "$scope", "$lobbyService", "$rootScope", function($scope, $lobbyService, $rootScope) {
      $scope.status = $lobbyService.status;
      $scope.startInstall = function() {
        return $lobbyService.installMod('checker');
      };
      $scope.showTroubleshoot = function(trouble) {
        var msg, title;
        msg = "Can't find troubleshooting for " + trouble + ", sorry.";
        title = "Not found!";
        switch (trouble) {
          case "manager":
            title = "Manager Issues";
            msg = "<p>First, check to make sure you're signed into the same Steam account on your computer as you are on the website. You need to restart the manager (right click dota icon in tray -> restart) any time you've changed something like this.</p>\n<p>Next, check to see if it actually connects - if it says 'Connected' then it has. If you're still having issues try running steam://flushconfig in your browser. If your client has connected but it does not say it has in the browser, the system is simply not linking the client with your account (it can't find the SteamIDs detected on your machine in any user accounts).</p>";
            break;
          case "download":
            title = "Download Issues";
            msg = "<p>So, the manager is connected, but download isn't working? First, double check that your manager is actually connected properly.</p>\n<p>You should see a notification at the bottom right with the install progress. Please wait at least 15 seconds for the download to start - it's possible that the server is just laggy right now.</p>\n<p>If your download fails midway, it's probably because the download had a hiccup midway through. Try again.</p>\n<p>If your extract fails, try closing Dota 2. Also check in the manager preferences (right click manager -> preferences in taskbar) that your Dota 2 directory is correct.</p>";
        }
        return bootbox.dialog({
          title: title,
          message: msg,
          buttons: {
            close: {
              label: "Close",
              className: 'btn-success'
            }
          }
        });
      };
      return $scope.$watch('$viewContentLoaded', function() {
        var cb, wiz;
        window.wiz = wiz = $("#setup-wizard").wizard({
          keyboard: false,
          backdrop: false,
          showCancel: false,
          showClose: false,
          progressBarCurrent: true,
          contentHeight: 325,
          buttons: {
            cancelText: "Cancel",
            nextText: "Next",
            backText: "Back",
            submitText: "Start Test",
            submittingText: "Starting..."
          }
        });
        cb = $rootScope.$on('lobby:error', function() {
          console.log("lobby error");
          wiz.submitFailure();
          wiz.changeNextButton("Try Again", "btn-success");
          return wiz.reset();
        });
        $scope.$on('$destroy', function() {
          cb();
          return wiz.close();
        });
        wiz.setSubtitle("Set up and test your D2Moddin client.");
        wiz.on("submit", function() {
          return $lobbyService.startLoadTest();
        });
        wiz.cards['setupmanager'].on('validate', function(card) {
          if (!$lobbyService.status.managerConnected) {
            $.pnotify({
              title: "Not Connected",
              text: "The manager isn't connected / hasn't linked with your account properly. Please click troubleshooting if you're having issues.",
              type: "error",
              delay: 5000
            });
            return false;
          }
          return true;
        });
        return wiz.show();
      });
    }
  ]).controller('DoTestCtrl', [
    "$scope", "$authService", "$lobbyService", "$location", function($scope, $authService, $lobbyService, $location) {
      var lobby;
      if (!$authService.isAuthed || $lobbyService.lobbies.length === 0) {
        return $location.url('/setup');
      }
      lobby = $scope.lobby = $lobbyService.lobbies[0];
      $scope.status = $lobbyService.status;
      $scope.isHost = $scope.lobby.creatorid === $authService.user._id;
      return $scope.sendConnect = function() {
        return $lobbyService.sendConnect();
      };
    }
  ]).controller("ModDetailCtrl", function($scope, $rootScope, $routeParams, $location, $sce) {
    var mod, modname;
    modname = $routeParams.modname;
    mod = _.findWhere($rootScope.mods, {
      name: modname
    });
    if (mod == null) {
      $location.url("/mods/");
      return;
    }
    $scope.btnClass = (mod.playable ? "" : "disabled");
    $scope.mod = mod;
  });

}).call(this);
