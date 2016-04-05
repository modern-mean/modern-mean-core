(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['$mdComponentRegistry', '$mdMedia', 'CORE_CONSTANTS'];

  function SideNavLeftController($mdComponentRegistry, $mdMedia, CORE_CONSTANTS) {
    var vm = this;

    vm.config = CORE_CONSTANTS.navigation.left;
    vm.isLockedOpen = isLockedOpen;

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation = nav;
      });

    function isLockedOpen() {
      vm.config.backdrop = CORE_CONSTANTS.navigation.left.backdrop;
      if (vm.config.locked.always) {
        vm.config.backdrop = true;
        return true;
      }

      if ($mdMedia(vm.config.locked.media)) {
        vm.config.backdrop = true;
        return true;
      }

      return false;
    }


    console.log('SideNavLeftController::Init', vm);
  }
})();
