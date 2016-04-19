(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavRightController', SideNavRightController);

  SideNavRightController.$inject = ['$mdComponentRegistry', '$log'];

  function SideNavRightController($mdComponentRegistry, $log) {
    var vm = this;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation = nav;
      });

    $log.info('SideNavRightController::Init', vm);
  }
})();
