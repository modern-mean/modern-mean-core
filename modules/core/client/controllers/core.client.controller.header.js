(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderToolbar', HeaderToolbar);

  HeaderToolbar.$inject = ['$timeout', '$mdSidenav', 'lodash'];

  function HeaderToolbar($timeout, $mdSidenav, lodash) {
    var vm = this;

    vm.toggleLeft = buildDelayedToggler('left');
    vm.toggleRight = buildDelayedToggler('right');

    function buildDelayedToggler(navID) {
      return lodash.debounce(function() {
        $mdSidenav(navID)
          .toggle()
      }, 200);
    }

    console.log('HeaderToolbar::Init', vm);
  }
})();
