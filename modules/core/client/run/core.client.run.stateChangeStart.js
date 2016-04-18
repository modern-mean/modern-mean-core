(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeStart);

  stateChangeStart.$inject = ['$rootScope', '$state', '$mdComponentRegistry'];
  function stateChangeStart($rootScope, $state, $mdComponentRegistry) {
    // Record previous state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
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
