(function() {
  'use strict';

  angular
    .module('users')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {

    return $resource('/api/me', {}, {
      addresses: {
        url: '/api/me/addresses',
        method: 'PUT'
      },
      emails: {
        url: '/api/me/emails',
        method: 'PUT'
      },
      update: {
        method: 'PUT'
      }
    });

  }
})();
