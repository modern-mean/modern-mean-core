(function() {
  'use strict';

  angular
    .module('core')
    .config(tracking)
    .run(function(Analytics) {});

  function tracking(AnalyticsProvider, CORE_CONSTANTS) {
    AnalyticsProvider.setAccount(CORE_CONSTANTS.analytics);
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
    console.log('Core::AnalyticsProvider::Loaded', AnalyticsProvider);
  };
})();
