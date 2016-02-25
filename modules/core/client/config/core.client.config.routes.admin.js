(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.admin', {
        abstract: true,
        url: '/admin',
        data: {
          roles: ['admin']
        }
      });
  }
})();
