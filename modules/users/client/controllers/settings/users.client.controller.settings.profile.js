(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersProfileController', UsersProfileController);

  UsersProfileController.$inject = ['Authentication', '$mdToast', '$log'];

  function UsersProfileController(Authentication, $mdToast, $log) {
    var vm = this;

    vm.clear = clear;
    vm.executing = false;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.user
        .$get()
        .then(function() {
          vm.forms.profileForm.$setPristine();
          vm.forms.profileForm.$setUntouched();
        });
    }

    function save() {
      $log.debug('UsersProfileController::save', vm);
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$update(function (response) {
        vm.executing = false;
        vm.clear();
        toast.textContent('Profile Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersProfileController::save::success', response);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Profile Update Error').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersProfileController::save::error', err);
      });
    }

    $log.info('Users::EditProfileController::Init', vm);
  }
})();
