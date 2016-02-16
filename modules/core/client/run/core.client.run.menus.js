(function() {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    menuService.toolbar.addItem({
      title: 'Modern-Mean',
      state: 'home',
      icon: 'menu',
      aria: 'Home',
      show: true,
      type: 'button'
    });

  }
})();
