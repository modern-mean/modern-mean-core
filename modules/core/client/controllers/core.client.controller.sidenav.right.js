(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavRightController', SideNavRightController);

  SideNavRightController.$inject = ['$mdSidenav'];

  function SideNavRightController($mdSidenav) {
    var vm = this;

    vm.close = function(navID) {
        $mdSidenav(navID)
        .close();
    }

      console.log('SideNavRightController::Init', vm);
  }
})();
