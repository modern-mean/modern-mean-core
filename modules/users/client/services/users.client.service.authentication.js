(function() {
  'use strict';

  angular
    .module('users')
    .service('Authentication', Authentication);

  Authentication.$inject = ['$q', '$resource', '$http', '$location', '$state', '$rootScope', 'AUTH_EVENTS', 'User'];

  function Authentication($q, $resource, $http, $location, $state, $rootScope, AUTH_EVENTS, User) {


    var readyPromise = $q.defer();

    var service = {
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      passwordReset: passwordReset,
      ready: readyPromise.promise,
      refresh: refresh,
      signout: signout,
      signup: signup,
      signin: signin,
      token: undefined,
      user: undefined,
    };

    function changePassword(credentials) {
      return $resource('/api/users/password').save(credentials);
    }



    function forgotPassword(credentials) {
      return $resource('/api/auth/forgot').save(credentials);
    }

    function passwordReset(token, credentials) {
      //TODO This probably doesn't work.  Not sending in token.  Should change to a JWT Token anyway
      return $resource('/api/auth/reset').save(credentials);
    }

    function refresh() {
      return $q(function(resolve, reject) {
        readyPromise = $q.defer();
        service.ready = readyPromise.promise;
        if (service.user === undefined) {
          service.user = new User({});
        }

        service
          .user
          .$me()
          .then(
            function (user) {
              login({ user: user });
              resolve(service);
            },
            function () {
              $state.go('authentication.signin');
            });

      });

    }

    function signout() {
      localStorage.removeItem('token');
      service.user = undefined;
      service.token = undefined;
      setHeader();
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function signin(credentials) {
      return $q(function(resolve, reject) {
        $resource('/api/auth/signin')
          .save(credentials).$promise
          .then(
            function (auth) {
              login(auth);
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
              login(auth);
              resolve(service);
            },
            function (err) {
              reject(err);
            }
          );
      });
    }

    //Private Methods

    function login(auth) {
      setUser(auth.user);
      if (auth.token) {
        setToken(auth.token);
      }
      setHeader();
      readyPromise.resolve(service);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
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

    function setUser(user) {
      service.user = new User(user);
    }

    function init() {
      service.token = localStorage.getItem('token') || $location.search().token || undefined;

      //Remove token from URL
      $location.search('token', undefined);

      if (service.token) {
        setHeader();
        setToken(service.token);
        refresh();
      } else {
        readyPromise.resolve(service);
      }
      console.log('AuthenticationService::Init', service);
    }

    //Run init
    init();




    return service;

  }
})();
