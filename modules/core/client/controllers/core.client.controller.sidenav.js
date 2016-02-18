(function () {
  'use strict';

  angular
    .module('core')
    .controller('SideNavController', SideNavController);

  SideNavController.$inject = ['menuService', '$state', '$mdSidenav'];

  function SideNavController(menuService, $state, $mdSidenav) {
    var vm = this;

    vm.menus = menuService.leftnav.items;

    
    console.log('SideNavController::Init', vm);
  }
})();
