angular.module('hm.controllers')
  .controller('FooterController', [
    '$scope',
    function($scope){
      $scope.scrollTop = function(){
        window.scrollTo(0,0);
      };

	    $scope.year = new Date().getFullYear();
    }
  ]);