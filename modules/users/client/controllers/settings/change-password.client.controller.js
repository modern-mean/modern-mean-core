(function() {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['Authentication', 'PasswordValidator', '$http', '$scope'];

  function ChangePasswordController(Authentication, PasswordValidator, $http, $scope) {
    var vm = this;

    vm.user = Authentication.user;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();

    // Change user password
    vm.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      $http.post('/api/users/password', vm.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        vm.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
})();
