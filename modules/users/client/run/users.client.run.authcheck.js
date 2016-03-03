(function() {
  'use strict';

  angular
    .module('users.routes')
    .run(authCheck);

  authCheck.$inject = ['$rootScope', '$state', 'Authentication'];
  function authCheck($rootScope, $state, Authentication) {
    // Check authentication before changing state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      if (toState.name === 'root.signout') {
        Authentication.signout();
      }

      if (toState.data.ignoreAuth) {
        return true;
      }

      Authentication.ready
        .then(function (auth) {
          if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
            var allowed = false;
            toState.data.roles.forEach(function (role) {
              if ((role === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1)) {
                allowed = true;
                return true;
              }
            });

            if (!allowed) {
              event.preventDefault();
              if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
                $state.go('root.forbidden');
              } else {
                $state.go('root.user.authentication.signin').then(function () {
                  $rootScope.storePreviousState(toState, toParams);
                });
              }
            }
          }
        });
    });

  }
})();
