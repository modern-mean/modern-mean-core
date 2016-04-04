(function() {
  'use strict';

  angular
    .module('core')
    .config(theme);

  function theme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        'default': '900',
        'hue-1': '600',
        'hue-2': '700',
        'hue-3': '800'
      })
      .accentPalette('teal', {
        'default': '500'
      })
      .warnPalette('red')
      .backgroundPalette('grey', {
        'default': '100'
      });

    //TODO  Will support toast themes when https://github.com/angular/material/issues/2878 is fixed
    $mdThemingProvider.theme('toast-success')
      .primaryPalette('green')
      .accentPalette('blue')
      .warnPalette('yellow')
      .backgroundPalette('green');

    //TODO  Will support toast themes when https://github.com/angular/material/issues/2878 is fixed
    $mdThemingProvider.theme('toast-error')
      .primaryPalette('red')
      .accentPalette('blue')
      .warnPalette('yellow')
      .backgroundPalette('red');

  }
})();
