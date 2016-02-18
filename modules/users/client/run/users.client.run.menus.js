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
      console.log('User::Run::Login::Event', Authentication);
      if (Authentication.user) {
        menuService.toolbar.addItem({
          id: 'usermenu',
          title: Authentication.user.displayName,
          icon: 'more_vert',
          type: 'menu',
          aria: 'User Menu',
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
            icon: 'logout',
            state: 'settings.accounts'
          },
          {
            title: 'Signout',
            icon: 'people',
            state: 'signout'
          }]
        });
      }

      menuService.toolbar.getItem({ state: 'authentication.signup' }).show = false;
      menuService.toolbar.getItem({ state: 'authentication.signin' }).show = false;

    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      console.log('User::Run::Logout::Event', menuService.toolbar);

      menuService.toolbar.getItem({ state: 'authentication.signup' }).show = true;
      menuService.toolbar.getItem({ state: 'authentication.signin' }).show = true;

      menuService.toolbar.removeItem({ id: 'usermenu' });

    });
      
  }

})();
