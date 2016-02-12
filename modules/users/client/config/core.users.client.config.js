(function(angular) {
  'use strict';

  angular
    .module('users')
    .config(usersConfig);

  usersConfig.$inject = ['$httpProvider'];
  function usersConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

})(angular);
