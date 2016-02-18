(function () {
  'use strict';

  angular
    .module('core')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['menuService', '$state', '$mdSidenav'];

  function ToolbarController(menuService, $state, $mdSidenav) {
    var vm = this;

    vm.menus = menuService.toolbar.items;
    

    console.log('ToolbarController::Init', vm);
  }
})();
