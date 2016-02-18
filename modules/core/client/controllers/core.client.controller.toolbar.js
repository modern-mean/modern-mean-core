(function () {
  'use strict';

  angular
    .module('core')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['menuService', '$state', '$mdSidenav', '$timeout'];

  function ToolbarController(menuService, $state, $mdSidenav, $timeout) {
    var vm = this;

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.menus = menuService.toolbar.items;

    console.log('ToolbarController::Init', vm);
    $timeout(function () {
      console.log('ToolbarController::Init::Timeout', vm);
    }, 2000);
  }
})();
