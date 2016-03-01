(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavRightController', SideNavRightController);

  SideNavRightController.$inject = ['Authentication', 'menuService', '$mdSidenav'];

  function SideNavRightController(Authentication, menuService, $mdSidenav) {
    var vm = this;

    vm.user = Authentication.user;
    vm.menus = menuService.rightnav.items;
    vm.close = close;

    function close(navID) {
      $mdSidenav(navID)
      .close();
    }

    console.log('SideNavRightController::Init', vm);
  }
})();
