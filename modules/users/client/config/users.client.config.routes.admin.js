(function() {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/users.client.views.list-users.html',
        controller: 'UserListController',
        controllerAs: 'vm'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/users.client.views.view-user.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/users.client.views.edit-user.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        }
      });

    getUser.$inject = ['$stateParams', 'UserAdmin'];
    function getUser($stateParams, UserAdmin) {
      return UserAdmin.get({ userId: $stateParams.userId });
    }
  }
})();
