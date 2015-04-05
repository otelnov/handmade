angular.module('hm.controllers')
  .controller('HeaderController', [
    '$scope', '$state',
    function($scope, $state){
	    console.log($state);
      $scope.$state = $state;
    }
  ]);