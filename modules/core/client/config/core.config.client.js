(function(angular) {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .config(appConfig);

  appConfig.$inject = ['$locationProvider', '$httpProvider'];
  function appConfig($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
  }



    /*
    // Record previous state
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      storePreviousState(fromState, fromParams);
    });

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }
    */



})(angular);
