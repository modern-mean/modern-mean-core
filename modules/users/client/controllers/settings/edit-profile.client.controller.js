(function() {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['Users', 'Authentication', '$http', '$location', '$scope'];

  function EditProfileController(Users, Authentication, $http, $location, $scope) {
    var vm = this;

    vm.user = Authentication.user;

    // Update a user profile
    vm.updateUserProfile = function (isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    };
  }
})();
