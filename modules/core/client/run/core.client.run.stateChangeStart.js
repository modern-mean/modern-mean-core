(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeStart);

  stateChangeStart.$inject = ['$rootScope', '$state', '$mdComponentRegistry', '$log'];
  function stateChangeStart($rootScope, $state, $mdComponentRegistry, $log) {
    // Record previous state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('Core::StateChangeStart', toState, fromState);
      closeSideNavs();
    });

    // Close Side Navigation
    function closeSideNavs() {
      $mdComponentRegistry
        .when('coreLeftNav')
        .then(function(nav){
          nav.close();
        });

      $mdComponentRegistry
        .when('coreRightNav')
        .then(function(nav){
          nav.close();
        });

    }

  }
})();
