(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Authentication'];

  function HomeController($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
})();
