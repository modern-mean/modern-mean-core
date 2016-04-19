(function() {
  'use strict';

  angular
    .module('users.routes')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', '$log'];

  function authInterceptor($q, $injector, $log) {
    $log.info('Users::authInterceptor::Init');
    return {
      responseError: function(rejection) {
        switch (rejection.status) {
          case 401:
            $injector.get('$state').transitionTo('root.user.authentication.signin');
            $log.debug('Users::authInterceptor::401', rejection);
            break;
          case 403:
            $injector.get('$state').transitionTo('root.forbidden');
            $log.debug('Users::authInterceptor::403', rejection);
            break;
        }
        return $q.reject(rejection);
      }
    };
  }
})();
