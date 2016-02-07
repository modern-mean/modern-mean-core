(function() {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenu('account', {
      roles: ['user']
    });

    Menus.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      icon: 'fa-edit',
      state: 'settings.profile'
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      icon: 'fa-camera',
      state: 'settings.picture'
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Edit Privacy Settings',
      icon: 'fa-shield',
      state: 'settings.privacy'
    });

    Menus.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      icon: 'fa-key',
      state: 'settings.password'
    });

  }

})();
