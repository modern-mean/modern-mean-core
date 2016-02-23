(function() {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['Authentication'];

  function EditProfileController(Authentication) {
    var vm = this;

    vm.update = update;
    vm.user = Authentication.user;

    function update() {
      vm.success = vm.error = undefined;

      vm.user.$update(function (response) {
        vm.success = response.message;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
})();
