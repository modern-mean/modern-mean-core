(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['$mdSidenav'];

  function SideNavLeftController($mdSidenav) {
    var vm = this;
    vm.close = close;

    function close(navID) {
      $mdSidenav(navID)
      .close();
    }

    console.log('SideNavLeftController::Init', vm);
  }
})();
