"use strict"
angular.module("d2mp.directives", []).directive("modthumbnail", ->
  templateUrl: "/partials/modThumb"
  replace: true
).directive("gameteamstats", ->
  templateUrl: "/partials/gameteamstats"
  replace: true
).directive("bootTooltip", ->
  replace: false
  scope:
    title: '='
  link: (scope,element,attrs)->
    tool = attrs.bootTooltip
    return if !tool? || tool is ""
    placement = attrs.placement || "left"
    element.tooltip
      title: tool
      placement: placement
      container: 'body'
    element.bind 'destroyed', ->
      $(".tooltip").remove()
).directive("inlineteams", ->
  templateUrl: "/partials/inlineteams"
  replace: true
).directive("customsort", ->
  restrict: 'A'
  transclude: true
  scope:
    order: '='
    sort: '='
  templateUrl: "/partials/lobbylistheader"
  link: (scope) ->
    scope.sort_by = (newOrder) ->
      sort = scope.sort;
      sort.reverse = if sort.order is newOrder then !sort.reverse else false
      sort.order = newOrder

    scope.selectedCls = (column) ->
      sort = scope.sort
      if column is sort.order 
        return if sort.reverse then 'fa-sort-down' else 'fa-sort-up'
      else
        return 'fa-sort'
)