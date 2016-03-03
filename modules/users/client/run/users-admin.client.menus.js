(function() {
  'use strict';

  // Configuring the Users module
  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuService', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuService, Authentication, $rootScope, AUTH_EVENTS) {

    $state.get('root').views.leftnav.templateUrl = 'modules/users/client/views/users.client.views.sidenav.left.html';
    $state.get('root').views.leftnav.controller = 'UserSideNavLeftController';
    $state.get('root').views.leftnav.controllerAs = 'vm';

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      var user = Authentication.user;

      if (user.roles == 'user,admin') {
        menuService.leftnav.addItem({
          id: 'adminmenu',
          title: 'Manage Users',
          state: 'root.admin.users',
          icon: 'supervisor_account',
          type: 'menu',
          aria: 'Account Menu',
          show: true
        });
        menuService.leftnav.getItem({ id: 'adminmenu' }).show = true;
      } else {
        menuService.leftnav.removeItem({ id: 'adminmenu' });
      };
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      menuService.leftnav.removeItem({ id: 'adminmenu' });
    });
  }
})();
