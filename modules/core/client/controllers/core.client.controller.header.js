(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$mdSidenav'];

  function HeaderController($mdSidenav) {
    var vm = this;

    vm.toggle = toggle;

    function toggle(navID) {
      $mdSidenav(navID)
        .toggle();
    }

    console.log('HeaderController::Init', vm);
  }
})();
