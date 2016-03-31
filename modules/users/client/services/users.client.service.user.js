(function() {
  'use strict';

  angular
    .module('users')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {

    return $resource('/api/me', {}, {
      update: {
        method: 'PUT'
      }
    });
    
  }
})();
