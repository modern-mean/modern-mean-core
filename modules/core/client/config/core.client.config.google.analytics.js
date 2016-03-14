(function() {
  'use strict';

  angular
    .module('core')
    .config(tracking)
    .run(function(Analytics) {});

  function tracking(AnalyticsProvider) {
    AnalyticsProvider.setAccount({
      name: "tracker",
      tracker: 'UA-XXXXXXXX-XX',
      trackEvent: true
    });

    // Track all routes (default is true).
    AnalyticsProvider.trackPages(true);

    // Track all URL query params (default is false).
    AnalyticsProvider.trackUrlParams(true);

    // Ignore first page view (default is false).
    // Helpful when using hashes and whenever your bounce rate looks obscenely low.
    AnalyticsProvider.ignoreFirstPageLoad(true);

    // URL prefix (default is empty).
    // Helpful when the app doesn't run in the root directory.
    // AnalyticsProvider.trackPrefix('/');

    // Change the default page event name.
    // Helpful when using ui-router, which fires $stateChangeSuccess instead of $routeChangeSuccess.
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

    // RegEx to scrub location before sending to analytics.
    // Internally replaces all matching segments with an empty string.
    AnalyticsProvider.setRemoveRegExp(/\/\d+?$/);

    console.log('Core::AnalyticsProvider::Loaded', AnalyticsProvider);
  };
})();
