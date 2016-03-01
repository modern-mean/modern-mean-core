(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['Authentication', 'menuService', '$mdSidenav'];

  function SideNavLeftController(Authentication, menuService, $mdSidenav) {
    var vm = this;

    vm.user = Authentication.user;
    vm.menus = menuService.leftnav.items;

    vm.close = function(navID) {
        $mdSidenav(navID)
        .close();
    }

    console.log('SideNavLeftController::Init', vm);
  }
})();
