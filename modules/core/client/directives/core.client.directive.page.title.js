(function() {
  'use strict';

  angular
    .module('core.routes')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$state', 'CORE_CONSTANTS'];

  function pageTitle($rootScope, $state, CORE_CONSTANTS) {
    var directive = {
      retrict: 'A',
      link: link
    };

    function link(scope, element) {

      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        if (toState.data && toState.data.pageTitle) {
          element.html(toState.data.pageTitle);
        } else {
          element.html(CORE_CONSTANTS.page.title);
        }
      }
    }

    return directive;
  }
})();
