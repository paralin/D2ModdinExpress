'use strict';

angular.module('d2mp.directives', [])
.directive('modthumbnail', function(){
  return {
    templateUrl: '/partials/modThumb',
    replace: true
  };
});
