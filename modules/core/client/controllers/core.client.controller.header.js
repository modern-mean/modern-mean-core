(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['menuService', '$state', '$mdSidenav'];

  function HeaderController(menuService, $state, $mdSidenav) {
    var vm = this;

    vm.menus = menuService.toolbar.items;


    console.log('HeaderController::Init', vm);
  }
})();
