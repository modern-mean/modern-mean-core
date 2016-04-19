(function() {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['Authentication', 'PasswordValidator', '$stateParams', '$location', '$log'];

  function PasswordController(Authentication, PasswordValidator, $stateParams, $location, $log) {
    var vm = this;

    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.resetUserPassword = resetUserPassword;


    function askForPasswordReset() {
      $log.debug('PasswordController::askForPasswordReset', vm);
      vm.success = vm.error = undefined;

      Authentication
        .forgotPassword(vm.credentials).$promise
        .then(
          function (response) {
            vm.credentials = undefined;
            vm.success = response.message;
            $log.debug('PasswordController::askForPasswordReset::success', response);
          },
          function (err) {
            vm.credentials = undefined;
            vm.error = err.data.message;
            $log.error('PasswordController::askForPasswordReset::error', vm);
          }
        );
    }

    function resetUserPassword() {
      $log.debug('PasswordController::resetUserPassword', vm);
      vm.success = vm.error = undefined;

      Authentication
        .passwordReset($stateParams.token, vm.credentials).$promise
        .then(
          function (response) {
            vm.passwordDetails = undefined;
            $location.path('/password/reset/success');
            $log.debug('PasswordController::resetUserPassword::success', response);
          },
          function (err) {
            vm.passwordDetails = undefined;
            vm.error = err.data.message;
            $log.error('PasswordController::resetUserPassword::error', err);
          }
        );
    }

    $log.info('PasswordController::Init', vm);
  }
})();
