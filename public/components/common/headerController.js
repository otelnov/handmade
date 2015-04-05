angular.module('hm.controllers')
  .controller('HeaderController', [
    '$scope', '$state',
    function($scope, $state){
      $scope.$state = $state;
    }
  ]);