(function() {
  'use strict';

  angular
    .module('users')
    .controller('UserSideNavRightController', UserSideNavRightController);

    UserSideNavRightController.$inject = ['Authentication', 'menuService', '$mdSidenav'];

    function UserSideNavRightController(Authentication, menuService, $mdSidenav) {
      var vm = this;

      vm.user = Authentication.user;
      vm.menus = menuService.sidenavright.items;

      vm.close = function(navID) {
          $mdSidenav(navID)
          .close();
      }

      console.log('UserSideNavRightController::Init', vm);
    }
})();
