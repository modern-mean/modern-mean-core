(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderToolbarController', HeaderToolbarController);

  HeaderToolbarController.$inject = ['$timeout', '$mdSidenav', 'lodash'];

  function HeaderToolbarController($timeout, $mdSidenav, lodash) {
    var vm = this;

    vm.toggleLeft = buildDelayedToggler('left');
    vm.toggleRight = buildDelayedToggler('right');

    function buildDelayedToggler(navID) {
      return lodash.debounce(function() {
        $mdSidenav(navID)
          .toggle()
      }, 200);
    }

    console.log('HeaderToolbarController::Init', vm);
  }
})();
