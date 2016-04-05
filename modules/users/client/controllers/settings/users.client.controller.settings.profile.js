(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersProfileController', UsersProfileController);

  UsersProfileController.$inject = ['Authentication', '$mdToast'];

  function UsersProfileController(Authentication, $mdToast) {
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
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$update(function (response) {
        vm.executing = false;
        vm.clear();
        toast.textContent('Profile Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Profile Update Error').theme('toast-error');
        $mdToast.show(toast);
      });
    }

    console.log('Users::EditProfileController::Init::vm', vm);
  }
})();
