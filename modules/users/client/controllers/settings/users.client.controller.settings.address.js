(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersAddressController', UsersAddressController);

  UsersAddressController.$inject = ['Authentication', '$mdToast', '$mdDialog'];

  function UsersAddressController(Authentication, $mdToast, $mdDialog) {
    var vm = this;

    vm.address = {};
    vm.clear = clear;
    vm.edit = edit;
    vm.editing = false;
    vm.executing = false;
    vm.forms = {};
    vm.remove = remove;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.address = {};
      vm.editing = false;
      vm.user
        .$get()
        .then(function() {
          vm.forms.addressForm.$setPristine();
          vm.forms.addressForm.$setUntouched();
        });
    }

    function edit(address) {
      vm.address = address;
      vm.editing = true;
    }

    function remove(address) {
      var confirm = $mdDialog.confirm()
          .title('Confirm Address Delete?')
          .textContent('Are you sure you want to delete this address?')
          .ok('Yes')
          .cancel('No');

      return $mdDialog
        .show(confirm)
        .then(function(result) {
          vm.user.addresses.splice(vm.user.addresses.indexOf(address), 1);
          vm.save();
        });


    }

    function save() {
      vm.executing = true;
      if (Object.keys(vm.address).length > 0 && vm.user.addresses.indexOf(vm.address) === -1) {
        vm.user.addresses.push(vm.address);
      }

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$addresses(function (response) {
        vm.executing = false;
        vm.clear();
        toast.textContent('Addresses Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Address Update Error').theme('toast-error');
        $mdToast.show(toast);
      });
    }

    console.log('Users::UsersAddressController::Init::vm', vm);
  }
})();
