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
).directive "inlineteams", ->
  templateUrl: "/partials/inlineteams"
  replace: true
