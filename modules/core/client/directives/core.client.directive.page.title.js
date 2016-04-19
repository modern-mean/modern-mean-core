(function() {
  'use strict';

  angular
    .module('core.routes')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$state', 'CORE_CONSTANTS', '$log'];

  function pageTitle($rootScope, $state, CORE_CONSTANTS, $log) {
    var directive = {
      retrict: 'A',
      link: link
    };

    function link(scope, element) {
      $rootScope.$on('$stateChangeStart', listener);

      function listener(event, toState) {
        $log.info('Core::Directive::PageTitle', toState.data.pageTitle);
        if (toState.data && toState.data.pageTitle) {
          element.html(CORE_CONSTANTS.page.title + ' - ' + toState.data.pageTitle);
        } else {
          element.html(CORE_CONSTANTS.page.title);
        }
      }
    }

    return directive;
  }
})();
