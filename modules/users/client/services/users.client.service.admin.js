(function() {
  'use strict';

  //TODO this should be Users service
  angular
    .module('users.admin')
    .factory('UserAdmin', UserAdmin);

  UserAdmin.$inject = ['$resource'];

  function UserAdmin($resource) {
    return $resource('/api/admin/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
