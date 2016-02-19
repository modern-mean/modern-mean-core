(function() {
  'use strict';

  angular
    .module('users')
    .service('Authentication', Authentication);

  Authentication.$inject = ['$q', '$resource', '$http', '$location', '$state', '$rootScope', 'AUTH_EVENTS'];

  function Authentication($q, $resource, $http, $location, $state, $rootScope, AUTH_EVENTS) {


    var readyPromise = $q.defer();

    var service = {
      forgotPassword: forgotPassword,
      login: login,
      passwordReset: passwordReset,
      ready: readyPromise.promise,
      refresh: refresh,
      signout: signout,
      signup: signup,
      signin: signin,
      token: undefined,
      user: undefined,
    };

    function forgotPassword(credentials) {
      return $resource('/api/auth/forgot').save(credentials);
    }

    function login(user, token) {
      setUser(user);
      setToken(token);
      setHeader();
      service.authenticated = true;
      readyPromise.resolve(service);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

    }

    function passwordReset(token, credentials) {
      return $resource('/api/auth/reset').save(credentials);
    }

    function refresh() {
      return $q(function(resolve, reject) {
        readyPromise = $q.defer();
        service.ready = readyPromise.promise;
        $resource('api/users/me').get().$promise
          .then(function (user) {
            setUser(user);
            readyPromise.resolve(service);
            resolve(service);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          });
      });

    }

    function setHeader() {
      $http.defaults.headers.common.Authorization = 'JWT ' + service.token;
    }

    function setToken(token) {
      service.token = token;
      localStorage.setItem('token', token);
    }

    function setUser(user) {
      service.user = user;
    }

    function signout() {
      localStorage.removeItem('token');
      service.user = null;
      service.token = null;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function signin(credentials) {
      return $resource('/api/auth/signin').save(credentials);
    }

    function signup(credentials) {
      return $resource('/api/auth/signup').save(credentials);
    }



    function init() {
      service.token = localStorage.getItem('token') || $location.search().token || null;

      //Remove token from URL
      $location.search('token', null);

      if (service.token) {
        setHeader();
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
