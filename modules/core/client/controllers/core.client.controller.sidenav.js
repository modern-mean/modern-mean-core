(function () {
  'use strict';

  angular
    .module('core')
    .controller('SideNavController', SideNavController);

  SideNavController.$inject = ['menuService', '$state', '$mdSidenav'];

  function SideNavController(menuService, $state, $mdSidenav) {
    var vm = this;

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.menus = menuService.leftnav.items;

    console.log('SideNavController::Init', vm);
  }
})();
