(function() {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['Authentication', 'PasswordValidator', '$state', '$location'];

  function AuthenticationController(Authentication, PasswordValidator, $state, $location) {
    var vm = this;

    vm.authentication = Authentication;
    vm.callOauthProvider = callOauthProvider;
    vm.error = $location.search().err || undefined;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.signin = signin;
    vm.signup = signup;


    function signup () {
      vm.error = undefined;

      Authentication
        .signup(vm.credentials)
        .then(
          function (response) {
            $state.go($state.previous.state.name || 'home', $state.previous.params);
          },
          function (err) {
            vm.error = err.data.message;
          }
        );
    }

    function signin () {
      vm.error = undefined;

      Authentication
        .signin(vm.credentials)
        .then(
          function (response) {
            $state.go($state.previous.state.name || 'home', $state.previous.params);
          },
          function (err) {
            vm.error = err.data.message;
          }
        );
    }

    function callOauthProvider (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }
      
      $location.path(url);
    }

    console.log('AuthenticationController::Init::vm', vm);
  }
})();
