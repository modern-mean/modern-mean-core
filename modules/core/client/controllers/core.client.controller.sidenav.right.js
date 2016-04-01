(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavRightController', SideNavRightController);

  SideNavRightController.$inject = ['$mdComponentRegistry'];

  function SideNavRightController($mdComponentRegistry) {
    var vm = this;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation = nav;
      });

    console.log('SideNavRightController::Init', vm);
  }
})();
