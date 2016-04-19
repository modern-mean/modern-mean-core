(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['UserAdmin', '$log'];

  function UserListController(UserAdmin, $log) {
    var vm = this;

    UserAdmin.query(function (users) {
      vm.users = users;
      $log.debug('UserListController::UsersLoaded', vm.users);
    });

    $log.info('UserListController::Init', vm);
  }
})();
