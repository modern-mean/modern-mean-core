(function() {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['Authentication', 'PasswordValidator', '$stateParams', '$location'];

  function PasswordController(Authentication, PasswordValidator, $stateParams, $location) {
    var vm = this;

    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.resetUserPassword = resetUserPassword;


    function askForPasswordReset() {
      vm.success = vm.error = undefined;

      Authentication
        .forgotPassword(vm.credentials).$promise
        .then(
          function (response) {
            vm.credentials = undefined;
            vm.success = response.message;
          },
          function (err) {
            vm.credentials = undefined;
            console.log(JSON.stringify(err));
            vm.error = err.data.message;
          }
        );
    }

    function resetUserPassword() {
      vm.success = vm.error = undefined;

      Authentication
        .passwordReset($stateParams.token, vm.credentials).$promise
        .then(
          function (response) {
            vm.passwordDetails = undefined;
            Authentication.login(response.user, response.token);
            $location.path('/password/reset/success');
          },
          function (err) {
            vm.passwordDetails = undefined;
            vm.error = err.data.message;
          }
        );
    }

    console.log('PasswordController::Init::vm', vm);
  }
})();
