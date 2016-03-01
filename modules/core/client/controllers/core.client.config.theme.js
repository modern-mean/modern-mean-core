(function() {
  'use strict';

  angular
    .module('core')
    .config('theme');

  theme.$inject = ['$mdThemingProvider'];

  function theme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '900',
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      })
      .accentPalette('purple', {
        'default': '500'
      });
  }
})();
