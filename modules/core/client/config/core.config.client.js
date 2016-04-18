(function() {
  'use strict';

  angular
    .module('core')
    .config(coreConfig);

  coreConfig.$inject = ['$locationProvider', '$httpProvider'];
  function coreConfig($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }

})();
