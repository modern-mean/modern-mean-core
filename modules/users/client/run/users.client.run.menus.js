(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['$state'];

  function menuConfig($state) {

    var rootState = $state.get('root');
    rootState.views.rightnav.templateUrl = 'modules/users/client/views/menus/users.client.views.menus.rightnav.html';
    rootState.views.rightnav.controller = 'UserRightNavController';



    /*
    menuService.toolbar.addItem({
      title: 'Sign In',
      icon: 'login',
      type: 'button',
      state: 'root.user.authentication.signin',
      aria: 'User Sign In',
      show: true
    });

    menuService.toolbar.addItem({
      title: 'Sign Up',
      icon: 'timer_auto',
      type: 'button',
      state: 'root.user.authentication.signup',
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


      menuService.toolbar.getItem({ state: 'root.user.authentication.signup' }).show = false;
      menuService.toolbar.getItem({ state: 'root.user.authentication.signin' }).show = false;

    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
      menuService.toolbar.getItem({ state: 'root.user.authentication.signup' }).show = true;
      menuService.toolbar.getItem({ state: 'root.user.authentication.signin' }).show = true;
      menuService.toolbar.removeItem({ id: 'usermenu' });
    });
    */

  }

})();
