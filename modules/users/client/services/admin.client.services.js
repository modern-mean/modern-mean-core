(function() {
  'use strict';

  //TODO this should be Users service
  angular
    .module('users.admin')
    .factory('Admin', Admin);

  Admin.$inject = ['$resource'];

  function Admin($resource) {
    return $resource('api/admin/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
