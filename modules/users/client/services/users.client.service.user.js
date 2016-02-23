(function() {
  'use strict';

  angular
    .module('users')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {
    return $resource('/api/users', {}, {
      update: {
        method: 'PUT'
      },
      me: {
        url: '/api/users/me'
      }
    });
  }
})();
