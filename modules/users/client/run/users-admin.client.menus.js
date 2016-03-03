(function() {
  'use strict';

  // Configuring the Users module
  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuService', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuService, Authentication, $rootScope, AUTH_EVENTS) {

    $state.get('root').views.mdSidenavLeft.templateUrl = 'modules/users/client/views/users.client.views.sidenav.left.html';
    $state.get('root').views.mdSidenavLeft.controller = 'UserSideNavLeftController';
    $state.get('root').views.mdSidenavLeft.controllerAs = 'vm';

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      var user = Authentication.user;

      if (user.roles == 'user,admin') {
        menuService.sidenavright.addItem({
          id: 'adminmenu',
          title: 'Manage Users',
          state: 'root.admin.users',
          icon: 'supervisor_account',
          type: 'menu',
          aria: 'Account Menu',
          show: true
        });
        menuService.sidenavright.getItem({ id: 'adminmenu' }).show = true;
      } else {
        menuService.sidenavright.removeItem({ id: 'adminmenu' });
      };
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      menuService.sidenavright.removeItem({ id: 'adminmenu' });
    });
  }
})();
