(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuFactory', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuFactory, Authentication, $rootScope, AUTH_EVENTS) {

    menuFactory.sidenavleft.addItem({
      id: 'coremenu',
      title: '',
      icon: '',
      type: 'menu',
      aria: 'Core Menu',
      show: true,
      items: [{
        title: 'homepage',
        icon: 'home',
        state: 'root.home'
      }]
    });
  }

})();
