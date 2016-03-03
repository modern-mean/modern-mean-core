(function() {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['Authentication', 'PasswordValidator'];

  function ChangePasswordController(Authentication, PasswordValidator) {
    var vm = this;

    vm.changeUserPassword = changeUserPassword;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.passwordDetails = {};

    // Change user password
    function changeUserPassword() {
      vm.success = vm.error = undefined;

      Authentication
        .changePassword(vm.passwordDetails).$promise
        .then(
          function (response) {
            vm.success = true;
            vm.passwordDetails = undefined;
          },
          function (err) {
            vm.error = err.data.message;
            vm.passwordDetails = undefined;
          }
        );
    }
  }
})();
