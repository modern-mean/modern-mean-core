(function() {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    // Redirect to 404 when route not found

    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/core.client.views.home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/core.client.views.404.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/core.client.views.400.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/core.client.views.403.html',
      data: {
        ignoreState: true
      }
    });

    console.log('Core::Routes::Loaded', $stateProvider);
  }

})();
