(function() {
  'use strict';

  angular
    .module('users')
    .controller('SigninAuthenticationController', SigninAuthenticationController);

  SigninAuthenticationController.$inject = ['Authentication', '$state', '$mdToast'];

  function SigninAuthenticationController(Authentication, $state, $mdToast) {
    var vm = this;

    vm.authentication = Authentication;
    vm.clearForm = clearForm;
    vm.credentials = {};
    vm.error = undefined;
    vm.forms = {};
    vm.signin = signin;

    function signin () {
      vm.error = undefined;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .signin(vm.credentials)
        .then(
          function (response) {
            $state.go($state.previous.state.name || 'root.home', $state.previous.params);
            toast.textContent('Signin Successful!').theme('toast-success');
            $mdToast.show(toast);
            vm.clearForm();
          },
          function (err) {
            vm.error = err.data.message;
            toast.textContent('Signin Failed!').theme('toast-error');
            $mdToast.show(toast);
          }
        );
    }

    function clearForm() {
      vm.credentials.email = '';
      vm.credentials.password = '';
      vm.forms.signIn.$setPristine();
      vm.forms.signIn.$setUntouched();
    }

    console.log('SigninAuthenticationController::Init::vm', vm);
  }
})();
