(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig(menuService, Authentication, $rootScope, AUTH_EVENTS) {

    menuService.toolbar.addItem({
      title: 'Sign In',
      icon: 'login',
      type: 'button',
      state: 'authentication.signin',
      aria: 'User Sign In',
      show: true
    });

    menuService.toolbar.addItem({
      title: 'Sign Up',
      icon: 'timer_auto',
      type: 'button',
      state: 'authentication.signup',
      aria: 'User Sign Up',
      show: true
    });


    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {

      menuService.toolbar.addItem({
        id: 'usermenu',
        title: Authentication.user.displayName,
        image: Authentication.user.profileImageURL,
        icon: 'more_vert',
        type: 'menu',
        aria: 'User Menu',
        position: 'target-right target',
        show: true,
        items: [{
          title: 'Edit Profile',
          icon: 'create',
          state: 'settings.profile'
        },
        {
          title: 'Change Profile Picture',
          icon: 'photo_camera',
          state: 'settings.picture'
        },
        {
          title: 'Change Password',
          icon: 'vpn_key',
          state: 'settings.password'
        },
        {
          title: 'Manage Social Accounts',
          icon: 'people',
          state: 'settings.accounts'
        },
        {
          title: 'Signout',
          icon: 'logout',
          state: 'signout'
        }]
      });


      menuService.toolbar.getItem({ state: 'authentication.signup' }).show = false;
      menuService.toolbar.getItem({ state: 'authentication.signin' }).show = false;

    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      menuService.toolbar.getItem({ state: 'authentication.signup' }).show = true;
      menuService.toolbar.getItem({ state: 'authentication.signin' }).show = true;
      menuService.toolbar.removeItem({ id: 'usermenu' });
    });

  }

})();
