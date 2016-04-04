(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAuthenticationController', SocialAuthenticationController);

  SocialAuthenticationController.$inject = ['$location', '$state'];

  function SocialAuthenticationController($location, $state) {
    var vm = this;

    vm.callOauthProvider = callOauthProvider;
    vm.error = $location.search().err || undefined;

    function callOauthProvider (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      $location.path(url);
    }

    console.log('SocialAuthenticationController::Init::vm', vm);
  }
})();
