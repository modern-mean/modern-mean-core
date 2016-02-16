(function () {
  'use strict';

  angular
    .module('core')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['Authentication', 'menuService', '$state', '$mdSidenav'];

  function ToolbarController(Authentication, menuService, $state, $mdSidenav) {
    var vm = this;

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    //vm.accountMenu = menuService.toolbar;
    vm.authentication = Authentication;
    vm.menus = menuService.toolbar.items;

    console.log('ToolbarController::Init', vm);
  }
})();
