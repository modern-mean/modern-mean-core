(function() {
  'use strict';

  angular
    .module('users')
    .factory('Authorization', Authorization);

  Authorization.$inject = ['$resource'];

  function Authorization($resource) {

    return $resource('/api/me/authorization');

  }
})();
