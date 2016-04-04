(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$mdComponentRegistry'];

  function HeaderController($mdComponentRegistry) {
    var vm = this;

    vm.navigation = {};

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation.left = nav;
      });

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation.right = nav;
      });

    console.log('HeaderController::Init', vm);
  }
})();
