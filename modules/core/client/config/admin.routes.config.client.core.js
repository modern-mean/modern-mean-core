(function() {
  'use strict';

  // Setting up route
  angular
    .module('core.admin.routes')
    .config(menuConfig);

  menuConfig.$inject = ['$stateProvider'];

  function menuConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
})();
