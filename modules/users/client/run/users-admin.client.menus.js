(function() {
  'use strict';

  // Configuring the Users module
  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    /*
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      icon: 'fa-users',
      state: 'admin.users'
    });
    */
  }
})();
