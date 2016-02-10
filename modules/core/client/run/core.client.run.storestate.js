(function(angular) {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(storeState);

  storeState.$inject = ['$rootScope', '$state'];
  function storeState($rootScope, $state) {
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

    //Save in rootscope for use in users module
    $rootScope.storePreviousState = storePreviousState;
  }
})(angular);
