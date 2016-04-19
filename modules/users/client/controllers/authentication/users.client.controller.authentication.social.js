(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAuthenticationController', SocialAuthenticationController);

  SocialAuthenticationController.$inject = ['$location', '$state', '$log'];

  function SocialAuthenticationController($location, $state, $log) {
    var vm = this;

    vm.callOauthProvider = callOauthProvider;
    vm.error = $location.search().err || undefined;

    function callOauthProvider (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      $location.path(url);
    }

    $log.info('SocialAuthenticationController::Init', vm);
  }
})();
