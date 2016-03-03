(function () {
  'use strict';

  angular
    .module('core')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['$timeout', '$mdSidenav'];

  function ToolbarController($timeout, $mdSidenav) {
    var vm = this;

    vm.toggleLeft = buildDelayedToggler('left');
    vm.toggleRight = buildDelayedToggler('right');

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = vm,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
      }
    }

    console.log('ToolbarController::Init', vm);
  }
})();
