'use strict';

angular.module('d2mp.directives', [])
.directive('modthumbnail', function(){
  return {
    templateUrl: '/partials/modThumb',
    replace: true
  };
}).
directive('inlineteams', function(){
  return {
    templateUrl: '/partials/inlineteams',
    replace: true
  };
});
