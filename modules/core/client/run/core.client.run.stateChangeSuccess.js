(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeSuccess);

  stateChangeSuccess.$inject = ['$rootScope', '$state', '$mdComponentRegistry'];
  function stateChangeSuccess($rootScope, $state, $mdComponentRegistry) {
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
})();
