(function() {
  'use strict';

  angular
    .module('users')
    .service('Authentication', Authentication);

  Authentication.$inject = ['$q', '$resource', '$http', '$location', '$state', 'User', 'Authorization', '$log'];

  function Authentication($q, $resource, $http, $location, $state, User, Authorization, $log) {


    var readyPromise = $q.defer();

    var service = {
      authorization: new Authorization(),
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      passwordReset: passwordReset,
      ready: readyPromise.promise,
      signout: signout,
      signup: signup,
      signin: signin,
      token: undefined,
      user: new User()
    };

    function changePassword(credentials) {
      return $resource('/api/me/password').save(credentials);
    }

    function forgotPassword(credentials) {
      return $resource('/api/auth/forgot').save(credentials);
    }

    function passwordReset(token, credentials) {
      //TODO This probably doesn't work.  Not sending in token.  Should change to a JWT Token anyway
      return $resource('/api/auth/reset').save(credentials);
    }

    function signout() {
      return $q(function(resolve, reject) {
        removeToken();
        service.user = new User();
        service.authorization = new Authorization();
        setHeader();
        readyPromise = $q.defer();
        resolve();
      });
    }

    function signin(credentials) {
      return $q(function(resolve, reject) {
        $resource('/api/auth/signin')
          .save(credentials).$promise
          .then(
            function (auth) {
              setToken(auth.token);
              init();
              resolve(service);
            },
            function (err) {
              reject(err);
            }
          );
      });
    }

    function signup(credentials) {
      return $q(function(resolve, reject) {
        $resource('/api/auth/signup')
          .save(credentials).$promise
          .then(
            function (auth) {
              setToken(auth.token);
              init();
              resolve(service);
            },
            function (err) {
              reject(err);
            }
          );
      });
    }

    function setHeader() {
      if (service.token) {
        $http.defaults.headers.common.Authorization = 'JWT ' + service.token;
      } else {
        $http.defaults.headers.common.Authorization = undefined;
      }
    }

    function setToken(token) {
      service.token = token;
      localStorage.setItem('token', token);
    }

    function removeToken() {
      service.token = undefined;
      localStorage.removeItem('token');
    }

    function init() {
      service.token = localStorage.getItem('token') || $location.search().token || undefined;

      //Remove token from URL
      $location.search('token', undefined);

      if (service.token) {
        setHeader();
        setToken(service.token);
        $q.all([service.user.$get(), service.authorization.$get()])
          .then(function (promises) {
            service.user = promises[0];
            service.authorization = promises[1];
            readyPromise.resolve(service);
          })
          .catch(function (err) {
            removeToken();
          });

      } else {
        readyPromise.resolve(service);
      }
      $log.info('AuthenticationService::Init', service);
    }

    //Run init
    init();

    return service;

  }
})();
