(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'Authentication'];

  function menuConfig(menuService, Authentication) {

      var authenticated = false;

      Authentication.ready.then(function (auth) {

        authenticated = ((auth.user && auth.user._id) ? true : false);

        menuService.toolbar.addItem({
          title: 'Sign In',
          icon: 'login',
          type: 'button',
          state: 'authentication.signin',
          aria: 'User Sign In',
          show: !authenticated
        });

        menuService.toolbar.addItem({
          title: 'Sign Up',
          icon: 'timer_auto',
          type: 'button',
          state: 'authentication.signup',
          aria: 'User Sign Up',
          show: !authenticated
        });

        menuService.toolbar.addItem({
          title: Authentication.user.displayName || null,
          icon: 'more_vert',
          type: 'menu',
          aria: 'User Menu',
          show: authenticated,
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
            state: 'settings.accounts'
          }]
        });



      });









    /*
    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      icon: 'create',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Profile Picture',
      icon: 'photo_camera',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      icon: 'vpn_key',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      icon: 'people',
      state: 'settings.accounts'
    });
    */
  }

})();
