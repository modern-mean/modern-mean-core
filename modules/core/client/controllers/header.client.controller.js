(function() {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['Authentication', 'Menus', '$state', '$scope'];

  function HeaderController(Authentication, Menus, $state, $scope) {
    var vm = this;

    // Expose view variables
    vm.$state = $state;
    vm.authentication = Authentication;

    // Get the topbar menu
    vm.menu = Menus.getMenu('topbar');

    // Get the account menu
    vm.accountMenu = Menus.getMenu('account').items[0];

    // Toggle the menu items
    vm.isCollapsed = false;
    vm.toggleCollapsibleMenu = function () {
      vm.isCollapsed = !vm.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      vm.isCollapsed = false;
    });
  }
})();
