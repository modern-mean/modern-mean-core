(function () {
  'use strict';

  angular
    .module('core')
    .controller('SideNavController', SideNavController);

  SideNavController.$inject = ['Authentication', 'menuService', '$state', '$mdSidenav'];

  function SideNavController(Authentication, menuService, $state, $mdSidenav) {
    var vm = this;

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.menu = menuService.getMenu('topbar');

    console.log('SideNavController::Init', vm);
  }
})();
