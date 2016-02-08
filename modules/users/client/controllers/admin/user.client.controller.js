(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['Authentication', 'userResolve', '$state'];

  function UserController(Authentication, userResolve, $state) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = userResolve;

    vm.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    vm.update = function (isValid) {
      if (!isValid) {
        vm.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };
  }
})();
