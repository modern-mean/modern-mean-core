(function() {
  'use strict';

  angular
    .module('users')
    .controller('UserSideNavLeftController', UserSideNavLeftController);

    UserSideNavLeftController.$inject = ['Authentication', 'menuService', '$mdSidenav'];

    function UserSideNavLeftController(Authentication, menuService, $mdSidenav) {
      var vm = this;

      vm.user = Authentication.user;
      vm.menus = menuService.sidenavleft.items;

      vm.close = function(navID) {
          $mdSidenav(navID)
          .close();
      }

      console.log('UserSideNavLeftController::Init', vm);
    }
})();
