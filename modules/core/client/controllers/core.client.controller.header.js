(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$timeout', '$mdSidenav', 'lodash'];

  function HeaderController($timeout, $mdSidenav, lodash) {
    var vm = this;

    vm.toggleLeft = buildDelayedToggler('left');
    vm.toggleRight = buildDelayedToggler('right');

    function buildDelayedToggler(navID) {
      return lodash.debounce(function() {
        $mdSidenav(navID)
          .toggle()
      }, 200);
    }

    console.log('HeaderController::Init', vm);
  }
})();
