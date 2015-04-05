angular.module('jse.common')
  .controller('ConfirmModalController', [
    '$scope', '$modalInstance', 'data',
    function confirmModalController($scope, $modalInstance, data) {
      $scope.data = data;

      $scope.submit = function () {
        $modalInstance.close();
      };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ])
  .controller('ShareModalController', [
    '$scope', '$modalInstance', 'TodoService', 'data',
    function shareModalController($scope, $modalInstance, todoService, data) {
      $scope.data = data;
      $scope.emails = data.list.users;
      $scope.model = {};
      $scope.owner = data.userId == data.list.user?'me':data.list.email;

      $scope.submit = function () {
        if($scope.model.email) {
          if(_.indexOf(data.list.users, $scope.model.email) == -1) {
            data.list.users.push($scope.model.email);
            todoService.put(data.list, function (err, resp) {});
          }
          $modalInstance.close();
        }
      };

      $scope.onEnter = function(keyEvent){
        if (keyEvent.which === 13)
          $scope.submit();
      };

      $scope.deleteUser = function(index){
        data.list.users.splice(index,1);
        todoService.put(data.list, function (err, resp) {});
      };

    }
  ]);