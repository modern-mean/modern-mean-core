(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuService', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuService, Authentication, $rootScope, AUTH_EVENTS) {

    $state.get('root').views.rightnav.templateUrl = 'modules/users/client/views/users.client.views.sidenav.right.html';
    $state.get('root').views.rightnav.controller = 'UserSideNavRightController';
    $state.get('root').views.rightnav.controllerAs = 'vm';

    menuService.rightnav.addItem({
      id: 'accountmenu',
      title: 'User Account Menu',
      image: '',
      icon: 'close',
      type: 'menu',
      aria: 'Account Menu',
      show: true,
      items: [{
        title: 'Account Sign In',
        icon: 'login',
        state: 'root.user.authentication.signin'
      },
      {
        title: 'Account Sign Up',
        icon: 'timer_auto',
        state: 'root.user.authentication.signup'
        }]
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {

      menuService.rightnav.addItem({
        id: 'usermenu',
        title: Authentication.user.displayName,
        image: Authentication.user.profileImageURL,
        icon: 'more_vert',
        type: 'menu',
        aria: 'User Menu',
        show: true,
        items: [{
          title: 'Dashboard',
          icon: 'dashboard',
          state: 'root.user.dashboard'
        },
        {
          title: 'Edit Profile',
          icon: 'create',
          state: 'root.user.settings.profile'
        },
        {
          title: 'Change Profile Picture',
          icon: 'photo_camera',
          state: 'root.user.settings.picture'
        },
        {
          title: 'Change Password',
          icon: 'vpn_key',
          state: 'root.user.settings.password'
        },
        {
          title: 'Manage Social Accounts',
          icon: 'people',
          state: 'root.user.settings.accounts'
        },
        {
          title: 'Signout',
          icon: 'logout',
          state: 'root.signout'
        }]
      });

      menuService.rightnav.getItem({ id: 'accountmenu' }).show = false;
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      menuService.rightnav.getItem({ id: 'accountmenu' }).show = true;
      menuService.rightnav.removeItem({ id: 'usermenu' });
    });
  }

})();
