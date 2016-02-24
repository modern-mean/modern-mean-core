(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['userResolve', '$state'];

  function UserController(userResolve, $state) {
    var vm = this;

    vm.remove = remove;
    vm.update = update;
    vm.user = userResolve;

    function remove (user) {
      vm.error = undefined;
      vm.user.$remove(
        function () {
          $state.go('root.admin.users');
        },
        function (err) {
          vm.error = err.data.message;
        }
      );
    }

    function update() {

      vm.user.$update(
        function (user) {
          $state.go('root.admin.user', {
            userId: user._id
          });
        },
        function (err) {
          vm.error = err.data.message;
        }
      );
    }

    console.log('Users.Admin::UserController::Init', vm);
  }
})();
