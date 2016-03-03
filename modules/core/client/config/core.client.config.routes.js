(function() {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('root.not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('root', {
      url: '',
      views: {
        'header': {
          controller: 'HeaderToolbarController',
          controllerAs: 'vm',
          templateUrl: 'modules/core/client/views/core.client.views.header.html'
        },
        'main': {
        },
        'leftnav': {
          controller: 'SideNavLeftController',
          controllerAs: 'vm',
          templateUrl: 'modules/core/client/views/core.client.views.sidenav.left.html'
        },
        'rightnav': {
          controller: 'SideNavRightController',
          controllerAs: 'vm',
          templateUrl: 'modules/core/client/views/core.client.views.sidenav.right.html'
        },
        'footer': {
          templateUrl: 'modules/core/client/views/core.client.views.footer.html'
        }
      }
    })
    .state('root.home', {
      url: '/',
      views: {
        'main@': {
          controller: 'HomeController',
          controllerAs: 'vm',
          templateUrl: 'modules/core/client/views/core.client.views.home.html'
        }
      },
      data: {
        pageTitle: 'Welcome'
      }
    })
    .state('root.not-found', {
      url: '/not-found',
      views: {
        'main@': {
          templateUrl: 'modules/core/client/views/core.client.views.404.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Page not found'
      }
    })
    .state('root.bad-request', {
      url: '/bad-request',
      views: {
        'main@': {
          templateUrl: 'modules/core/client/views/core.client.views.400.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Bad request'
      }
    })
    .state('root.forbidden', {
      url: '/forbidden',
      views: {
        'main@': {
          templateUrl: 'modules/core/client/views/core.client.views.403.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Not authorized'
      }
    });

    console.log('Core::Routes::Loaded', $stateProvider);
  }
})();
