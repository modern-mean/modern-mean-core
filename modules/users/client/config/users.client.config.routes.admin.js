(function() {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.admin.users', {
        url: '/users',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/admin/users.client.views.list-users.html',
            controller: 'UserListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.admin.user', {
        url: '/users/:userId',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/admin/users.client.views.view-user.html',
            controller: 'UserController',
            controllerAs: 'vm',
            resolve: {
              userResolve: getUser
            }
          }
        }
      })
      .state('root.admin.user-edit', {
        url: '/users/:userId/edit',
        views: {
          'main@': {
            templateUrl: 'modules/users/client/views/admin/users.client.views.edit-user.html',
            controller: 'UserController',
            controllerAs: 'vm',
            resolve: {
              userResolve: getUser
            }
          }
        }
      });

    getUser.$inject = ['$stateParams', 'UserAdmin'];
    function getUser($stateParams, UserAdmin) {
      return UserAdmin.get({ userId: $stateParams.userId });
    }
  }
})();
