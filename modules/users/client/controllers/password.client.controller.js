(function() {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['Authentication', 'PasswordValidator', '$stateParams', '$http', '$location','$scope'];

  function PasswordController(Authentication, PasswordValidator, $stateParams, $http, $location, $scope) {
    var vm = this;

    vm.authentication = Authentication;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    vm.askForPasswordReset = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

        return false;
      }

      $http.post('/api/auth/forgot', vm.credentials).success(function (response) {
        // Show user success message and clear form
        vm.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        vm.credentials = null;
        vm.error = response.message;
      });
    };

    // Change user password
    vm.resetUserPassword = function (isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, vm.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        vm.passwordDetails = null;

        // Attach user profile
        Authentication.login(response.user, response.token);

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        vm.error = response.message;
      });
    };
  }
})();
