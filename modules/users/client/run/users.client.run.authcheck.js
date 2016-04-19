(function() {
  'use strict';

  angular
    .module('users.routes')
    .run(authCheck);

  authCheck.$inject = ['$rootScope', '$state', 'Authentication', 'Authorization', '$log'];
  function authCheck($rootScope, $state, Authentication, Authorization, $log) {
    // Check authentication before changing state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      if (toState.data.ignoreAuth) {
        $log.debug('Users::AuthCheck::Ignored', toState);
        return true;
      }

      Authentication.ready
        .then(function (auth) {
          $log.debug('Users::AuthCheck::Ready', Authentication);
          if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
            var allowed = false;
            toState.data.roles.forEach(function (role) {
              if (role === 'guest' || (Authentication.authorization.roles && Authentication.authorization.roles.indexOf(role) !== -1)) {
                allowed = true;
                return true;
              }
            });

            if (!allowed) {
              $log.debug('Users::AuthCheck::NotAllowed', Authentication);
              event.preventDefault();
              if (Authentication.token !== undefined) {
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
