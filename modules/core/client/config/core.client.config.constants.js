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
      },
      navigation: {
        left: {
          heading: 'Left Navigation',
          backdrop: true,
          locked: {
            always: false,
            media: 'gt-sm'
          }
        },
        right: {
          locked: {
            always: false
          }
        }
      }

    });

})();
