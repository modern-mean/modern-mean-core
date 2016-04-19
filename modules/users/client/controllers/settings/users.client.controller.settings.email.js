(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersEmailController', UsersEmailController);

  UsersEmailController.$inject = ['Authentication', '$mdToast', '$log'];

  function UsersEmailController(Authentication, $mdToast, $log) {
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
      $log.debug('UsersEmailController::add:success', vm.user.emails);
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
      $log.debug('UsersEmailController::remove:success', vm.user.emails);
    }

    function save() {
      $log.debug('UsersEmailController::save', vm);
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$emails(function (response) {
        vm.executing = false;
        clear();
        toast.textContent('Emails Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersEmailController::save:success', response);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Email Update Error').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersEmailController::save:error', err);
      });
    }

    function togglePrimary(email) {
      vm.user.emails.forEach(function (email) {
        email.primary = false;
      });
      email.primary = true;
      $log.debug('UsersEmailController::togglePrimary', email, vm.user.emails);
    }

    $log.info('Users::UsersEmailController::Init', vm);
  }
})();
