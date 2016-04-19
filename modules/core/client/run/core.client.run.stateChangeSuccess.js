(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeSuccess);

  stateChangeSuccess.$inject = ['$rootScope', '$state', '$mdComponentRegistry', '$log'];
  function stateChangeSuccess($rootScope, $state, $mdComponentRegistry, $log) {
    // Record previous state
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('Core::StateChangeSuccess', toState, fromState);
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
