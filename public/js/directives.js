'use strict';

angular.module('d2mp.directives', [])
.directive('modthumbnail', function(){
  return {
    templateUrl: '/partials/modThumb',
    replace: true
  };
}).
directive('gameteamstats', function(){
  return {
    templateUrl: '/partials/gameteamstats',
    replace: true
  }
}).
directive('inlineteams', function(){
  return {
    templateUrl: '/partials/inlineteams',
    replace: true
  };
});
