(function() {
  'use strict';

  angular
    .module('core')
    .constant('CORE_CONSTANTS', {
      page: {
        title: 'Modern MEAN'
      },
      analytics: {
        name: 'tracker',
        tracker: 'UA-XXXXXXXX-XX',
        trackEvent: true
      }

    });

})();
