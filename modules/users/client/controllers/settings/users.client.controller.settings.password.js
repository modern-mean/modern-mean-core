(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersPasswordController', UsersPasswordController);

  UsersPasswordController.$inject = ['Authentication', 'PasswordValidator', '$mdToast'];

  function UsersPasswordController(Authentication, PasswordValidator, $mdToast) {
    var vm = this;

    vm.clear = clear;
    vm.forms = {};
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.password = {};
    vm.save = save;

    function clear() {
      vm.password = {};
      vm.forms.passwordForm.$setPristine();
      vm.forms.passwordForm.$setUntouched();
    }

    function save() {

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .changePassword(vm.password).$promise
        .then(
          function (response) {
            vm.clear();
            toast.textContent('Password Changed Successfully!').theme('toast-success');
            $mdToast.show(toast);
          },
          function (err) {
            toast.textContent('Password Change Error!').theme('toast-error');
            $mdToast.show(toast);
          }
        );
    }
  }
})();
