(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersEmailController', UsersEmailController);

  UsersEmailController.$inject = ['Authentication', '$mdToast'];

  function UsersEmailController(Authentication, $mdToast) {
    var vm = this;

    vm.add = add;
    vm.clear = clear;
    vm.executing = false;
    vm.forms = {};
    vm.remove = remove;
    vm.save = save;
    vm.togglePrimary = togglePrimary;
    vm.user = Authentication.user;

    function add() {
      vm.user.emails.push({ email: undefined, default: false });
    }

    function clear() {
      vm.user
        .$get()
        .then(function() {
          vm.forms.emailForm.$setPristine();
          vm.forms.emailForm.$setUntouched();
        });
    }

    function remove(email) {
      vm.user.emails.splice(vm.user.emails.indexOf(email), 1);
      vm.forms.emailForm.$pristine = false;
    }

    function save() {
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$update(function (response) {
        vm.executing = false;
        clear();
        toast.textContent('Emails Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Email Update Error').theme('toast-error');
        $mdToast.show(toast);
      });
    }

    function togglePrimary(email) {
      vm.user.emails.forEach(function (email) {
        email.primary = false;
      });
      email.primary = true;
    }

    console.log('Users::UsersEmailController::Init::vm', vm);
  }
})();
