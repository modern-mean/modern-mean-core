(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['$mdSidenav'];

  function SideNavLeftController($mdSidenav) {
    var vm = this;
    vm.menus = menuFactory.sidenavleft.items;

    vm.close = function(navID) {
      $mdSidenav(navID)
      .close();
    }

    console.log('SideNavLeftController::Init', vm);
  }
})();
