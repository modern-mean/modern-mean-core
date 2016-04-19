(function() {
  'use strict';

  angular
    .module('core')
    .config(tracking)
    .run(function(Analytics) {});

  tracking.$inject = ['AnalyticsProvider', 'CORE_CONSTANTS'];

  function tracking(AnalyticsProvider, CORE_CONSTANTS) {
    AnalyticsProvider.setAccount(CORE_CONSTANTS.analytics);
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  };
})();
