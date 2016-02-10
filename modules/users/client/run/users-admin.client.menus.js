(function() {
  'use strict';

  // Configuring the Users module
  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      icon: 'fa-users',
      state: 'admin.users'
    });
  }
})();
