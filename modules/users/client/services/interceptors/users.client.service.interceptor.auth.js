(function() {
  'use strict';

  angular
    .module('users.routes')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector'];

  function authInterceptor($q, $injector) {
    return {
      responseError: function(rejection) {
        switch (rejection.status) {
          case 401:
            $injector.get('$state').transitionTo('root.user.authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('root.forbidden');
            break;
        }
        return $q.reject(rejection);
      }
    };
  }
})();
